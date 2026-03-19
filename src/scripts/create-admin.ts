import "dotenv/config";
import bcrypt from "bcrypt";
import { connectToDatabase } from "@/lib/db/mongoose";
import { User } from "@/models";

async function createAdmin() {
  const email = process.argv[2];
  const password = process.argv[3];
  const role = (process.argv[4] as "admin" | "super_admin" | undefined) ?? "admin";

  if (!email || !password) {
    throw new Error("Usage: npm run create:admin -- <email> <password> [admin|super_admin]");
  }

  await connectToDatabase();

  const exists = await User.findOne({ email });
  if (exists) {
    throw new Error("User with that email already exists.");
  }

  const user = await User.create({
    name: role === "super_admin" ? "Super Admin" : "Admin User",
    email,
    passwordHash: await bcrypt.hash(password, 12),
    role,
    emailVerified: true,
    preferredLanguage: "en",
  });

  console.info(`Created ${role}: ${user.email}`);
}

createAdmin()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => process.exit(0));
