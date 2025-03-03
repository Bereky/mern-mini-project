import { expressjwt } from "express-jwt";
import dotenv from "dotenv";
dotenv.config();

export const authenticate = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});