import Ticket from "./../models/ticket.model.js";
import User from "../models/user.model.js";
import { isValidObjectId } from "mongoose";

class TicketService {
  async create(userId, payload) {
    try {
      const { title, description } = payload;

      await Ticket.create({ title, description, createdBy: userId });

      return;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getTickets(userId) {
    try {
      const user = await User.findById(userId);

      if (!user) {
        throw new Error("User is not found!");
      }

      const response = await Ticket.aggregate([
        {
          $match: {
            ...(user.role !== "admin" ? { createdBy: user._id } : {}),
          },
        },
        {
          $sort: {
            createdAt: -1,
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "createdBy",
            foreignField: "_id",
            as: "creator",
          },
        },
        {
          $unwind: "$creator",
        },
        {
          $project: {
            _id: 1,
            creator: {
              name: 1,
            },
            title: 1,
            description: 1,
            status: 1,
            createdAt: 1,
          },
        },
      ]);

      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getTicket(userId, payload) {
    try {
      const { id } = payload;

      const validateTicketId = isValidObjectId(id);

      if (!validateTicketId) {
        throw new Error("Invalid Id");
      }

      const user = await User.findById(userId);
      const ticket = await Ticket.findById(id);

      if (!ticket) {
        throw new Error("Ticket is not found!");
      }

      const response = await Ticket.aggregate([
        {
          $match: {
            _id: ticket._id,
            ...(user.role !== "admin" ? { createdBy: user._id } : {}),
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "createdBy",
            foreignField: "_id",
            as: "creator",
          },
        },
        {
          $unwind: "$creator",
        },
        {
          $project: {
            _id: 1,
            creator: {
              name: 1,
              email: 1,
            },
            title: 1,
            description: 1,
            status: 1,
          },
        },
      ]);

      return response?.length > 0 ? response[0] : null;
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(userId, ticketId, payload) {
    try {
      const { title, description, status } = payload;

      const validateTicketId = isValidObjectId(ticketId);

      if (!validateTicketId) {
        throw new Error("Invalid Ticket Id");
      }

      const user = await User.findById(userId);
      const ticket = await Ticket.findById(ticketId);

      if (user.role !== "admin") {
        throw new Error("Invalid role!");
      }

      if (!ticket) {
        throw new Error("Ticket is not found!");
      }

      await Ticket.findOneAndUpdate(
        { _id: ticketId },
        { title, description, status }
      );

      return;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default new TicketService();
