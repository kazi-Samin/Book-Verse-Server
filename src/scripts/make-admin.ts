import { MongoClient } from "mongodb";
import { env } from "../config/env";

const email = process.argv[2];

if (!email) {
  console.log("Usage: npx tsx src/scripts/make-admin.ts <user-email>");
  process.exit(1);
}

async function makeAdmin() {
  const client = new MongoClient(env.MONGO_URI);
  try {
    await client.connect();
    const db = client.db(); // Uses db name from URI
    
    // Better-auth uses the 'user' collection by default
    const result = await db.collection("user").updateOne(
      { email },
      { $set: { role: "admin" } }
    );
    
    if (result.matchedCount > 0) {
      if (result.modifiedCount > 0) {
        console.log(`✅ Successfully made ${email} an admin!`);
      } else {
        console.log(`⚠️ User with email ${email} is already an admin.`);
      }
    } else {
      console.log(`❌ User with email ${email} not found.`);
    }
  } catch (error) {
    console.error("Failed to update user role:", error);
  } finally {
    await client.close();
  }
}

makeAdmin();
