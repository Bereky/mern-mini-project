import ticketService from "../services/ticket.service.js";
import {
  createTicketSchema,
  getTicketSchema,
  updateTicketSchema,
} from "../validations/ticket.validation.js";

class TicketController {
  async create(req, res) {
    try {
      const { userId } = req.auth;
      const { error, value } = createTicketSchema(req.body);

      if (error) {
        return res
          .status(400)
          .json({ success: false, message: error.details[0].message });
      }

      await ticketService.create(userId, value);

      return res.status(201).json({
        success: true,
        message: "Ticket created successfully!",
      });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }

  async getTickets(req, res) {
    try {
      const { userId } = req.auth;
      const response = await ticketService.getTickets(userId);

      return res.status(200).json({
        success: true,
        data: response,
      });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }

  async getTicket(req, res) {
    try {
      const { userId } = req.auth;
      const { error, value } = getTicketSchema(req.params);

      if (error) {
        return res
          .status(400)
          .json({ success: false, message: error.details[0].message });
      }

      const response = await ticketService.getTicket(userId, value);

      return res.status(200).json({
        success: true,
        data: response,
        message: null,
      });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }

  async update(req, res) {
    try {
      const { userId } = req.auth;
      const { id } = req.params;
      const { error, value } = updateTicketSchema(req.body);

      if (error) {
        return res
          .status(400)
          .json({ success: false, message: error.details[0].message });
      }

      await ticketService.update(userId, id, value);

      return res.status(201).json({
        success: true,
        message: "Ticket updated successfully!",
      });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }
}

export default new TicketController();
