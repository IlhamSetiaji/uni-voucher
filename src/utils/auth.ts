import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key"; // Use a strong secret key in production

export function generateToken(userId: string) {
  return jwt.sign({ userId }, SECRET_KEY, { expiresIn: "1h" });
}

export function verifyToken(token: string) {
  return jwt.verify(token, SECRET_KEY);
}

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function comparePassword(
  password: string,
  hashedPassword: string
) {
  return bcrypt.compare(password, hashedPassword);
}
