import Joi from "joi";

export const createTicketSchema = (payload) => {
  const schema = Joi.object({
    title: Joi.string().required().min(2).messages({
      "string.base": "Title name must be a string",
      "string.empty": "Title name is required",
      "string.min": "Title name must be at least 2 characters long",
    }),
    description: Joi.string().required().min(2).messages({
      "string.base": "Description name must be a string",
      "string.empty": "Description name is required",
      "string.min": "Description name must be at least 2 characters long",
    }),
  });

  return schema.validate(payload, { presence: "required" });
};

export const getTicketSchema = (payload) => {
  const schema = Joi.object({
    id: Joi.string().required().messages({
      "string.base": "Ticket id must be a string",
      "string.empty": "Ticket id is required",
    }),
  });

  return schema.validate(payload, { presence: "required" });
};

export const updateTicketSchema = (payload) => {
  const schema = Joi.object({
    status: Joi.string()
      .required()
      .valid("Open", "In Progress", "Resolved", "Closed")
      .messages({
        "string.base": "Title name must be a string",
        "string.empty": "Title name is required",
        "any.only": "Status is invalid",
      }),
  });

  return schema.validate(payload, { presence: "required" });
};
