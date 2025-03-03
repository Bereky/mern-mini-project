import { Router } from "express";

import authRoutes from "./auth.routes.js";
import ticketRoutes from "./ticket.routes.js";

import { authenticate } from "../middlewares/auth.middleware.js";

const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/tickets", authenticate, ticketRoutes);

export default routes;
