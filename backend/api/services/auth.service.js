import jwt from "jsonwebtoken";
import User from "./../models/user.model.js";
import { hashPassword, verifyPassword } from "../utils/cryptography.js";

class AuthService {
  async register(payload) {
    const {
      name,
      role,
      email,
      password,
    } = payload;

    try {
      const incomingEmail = email.toLowerCase();

      const emailExist = await User.findOne({ email: incomingEmail });

      if (emailExist) {
        throw new Error(
          "It looks like this email address is already registered with an account. "
        );
      }

      const hashedPassword = await hashPassword(password);

      const user = await User.create({
        name,
        role,
        email: incomingEmail,
        password: hashedPassword,
      });

      if (!user) {
        throw new Error("Error occured while creating account");
      }

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1hr",
      });

      return { token }
    } catch (error) {
      throw new Error(error);
    }
  }

  async login(payload) {
    try {
      const { email, password } = payload;

      const user = await User.findOne({ email });

      if (!user) {
        throw new Error("Invalid email or password")
      }

      const isPasswordValid = await verifyPassword(password, user.password);

      if (!isPasswordValid) {
        throw new Error("Invalid password")
      }

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1hr",
      });

      return { token };
    } catch (error) {
      throw new Error(error);
    }
  }

  async me( userId) {
    try {
      const user = await User.findById(userId);

      if (!user) {
        throw new Error("Invalid Request");
      }

      const response = {
          userId: user._id,
          name: user.name,
          role: user.role
      };

      return response;
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default new AuthService();
