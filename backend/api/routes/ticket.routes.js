import { Router } from "express";

import ticketController from "../controllers/ticket.controller.js";

const routes = Router();

routes.post("/", ticketController.create);
routes.put("/:id", ticketController.update);
routes.get("/:id", ticketController.getTicket);
routes.get("/", ticketController.getTickets);

export default routes;
