import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { env } from "./env";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(env.MONGO_URI);
const db = client.db(); // Uses the database specified in the URI

export const auth = betterAuth({
  database: mongodbAdapter(db),
  baseURL: env.BETTER_AUTH_URL,
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
      enabled: env.NODE_ENV === "production",
    }
  },
});
