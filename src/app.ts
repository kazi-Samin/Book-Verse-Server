import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { getAuth } from "./config/auth";
import { env } from "./config/env";
import rateLimit from "express-rate-limit";

// Route imports
import bookRoutes from "./features/books/book.route";
import dashboardRoutes from "./features/dashboard/dashboard.route";

// Trick Vercel's Node File Trace into bundling better-auth
if (process.env.NEVER_TRUE === "true") {
  require("better-auth");
  require("better-auth/node");
  require("better-auth/plugins");
  require("better-auth/adapters/mongodb");
}

const app = express();

// Security and utility middlewares
app.use(helmet());
app.use(
  cors({
    origin: env.FRONTEND_URL,
    credentials: true, // required for Better Auth cookies
  })
);
app.use(compression());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(env.NODE_ENV === "development" ? "dev" : "combined"));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again after 15 minutes",
});
app.use("/api", limiter);

// Better Auth Route
app.use("/api/auth", async (req, res, next) => {
  try {
    const { toNodeHandler } = await new Function("return import('better-auth/node')")();
    const auth = await getAuth();
    const handler = toNodeHandler(auth);
    return handler(req, res);
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message, data: null });
  }
});

// Feature Routes
app.use("/api/books", bookRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Health check route
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Backend Status</title>
      <style>
        body {
          background-color: white;
          color: black;
          font-family: sans-serif;
          font-size: 14px;
          margin: 0;
          padding: 10px;
          text-align: left;
        }
      </style>
    </head>
    <body>
      backend connected successfully
    </body>
    </html>
  `);
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found", data: null });
});

// Global Error Handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    data: null,
  });
});

export default app;
