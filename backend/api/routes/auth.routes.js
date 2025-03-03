import { Router } from "express";

import authController from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const routes = Router();

routes.post("/login", authController.login);
routes.post("/register", authController.register);
//routes.post("/logout", authController.logout);

routes.get("/me", authenticate,  authController.me);

export default routes;
