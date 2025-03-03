import authService from "../services/auth.service.js";

import { loginSchema, registerSchema } from "../validations/auth.validation.js";

class AuthController {
  async register(req, res) {
    try {
      const { error, value } = registerSchema(req.body);

      if (error) {
        return res
          .status(400)
          .json({ success: false, message: error.details[0].message });
      }

      const response = await authService.register(value);

      return res.status(201).json({
        success: true,
        data: response,
        message: "Account created successfully",
      });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }

  async login(req, res) {
    try {
      const { error, value } = loginSchema(req.body);

      if (error) {
        return res
          .status(400)
          .json({ success: false, message: error.details[0].message });
      }

      const response = await authService.login(value);

      res.status(200).json({ success: true, data: response });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }

  async me(req, res) {
    const {userId} = req.auth;

    try {
      const response = await authService.me(userId);

      return res.status(200).json({ success: true, data: response });
    } catch (error) {
      return res.status(403).json({ success: false, message: error.message });
    }
  }

  /* async logout(req, res, next) {
    const auth = req.auth;
    try {
      await authService.logout(auth);

      return res
        .status(200)
        .json({ success: true, message: "Logout Success!" });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  } */
}

export default new AuthController();
