import { MongoClient } from "mongodb";
import { env } from "./env";

const client = new MongoClient(env.MONGO_URI);
const db = client.db();

let authInstance: any = null;

const asyncImport = async (moduleName: string) => {
  return await new Function(`return import('${moduleName}')`)();
};

export const getAuth = async () => {
  if (authInstance) return authInstance;

  const { betterAuth } = await asyncImport("better-auth");
  const { admin } = await asyncImport("better-auth/plugins");
  const { mongodbAdapter } = await asyncImport("better-auth/adapters/mongodb");

  const frontendUrl = env.FRONTEND_URL.replace(/\/$/, "");

  authInstance = betterAuth({
    database: mongodbAdapter(db),
    baseURL: env.BETTER_AUTH_URL,
    trustedOrigins: [frontendUrl, "http://localhost:3000"],
    plugins: [admin({
      defaultRole: "user",
      adminUsers: ["kazisamin0173@gmail.com", "starspanglefinance@gmail.com"]
    })],
    emailAndPassword: {
      enabled: true,
    },
    socialProviders: {
      google: {
        clientId: env.GOOGLE_CLIENT_ID || "",
        clientSecret: env.GOOGLE_CLIENT_SECRET || "",
        enabled: !!(env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET),
      },
    },
    account: {
      accountLinking: {
        enabled: true,
        trustedProviders: ["google"],
      },
    },
    session: {
      expiresIn: 60 * 60 * 24 * 7, // 7 days
      updateAge: 60 * 60 * 24, // 1 day
      cookieCache: {
        enabled: true,
        maxAge: 5 * 60,
      }
    },
    advanced: {
      cookiePrefix: "bookverse",
      crossSubDomainCookies: {
        enabled: false,
      },
      defaultCookieAttributes: {
        sameSite: "none",
        secure: true,
      }
    },
  });

  return authInstance;
};
