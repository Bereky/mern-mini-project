import Joi from "joi";

export const registerSchema = (payload) => {
  const schema = Joi.object({
    name: Joi.string().required().min(2).messages({
      "string.base": "Name must be a string",
      "string.empty": "Name is required",
      "string.min": "Name must be at least 2 characters long",
    }),
    email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required().messages({
      "string.base": "Email must be a string",
      "string.empty": "Email is required",
    }),
    password: Joi.string().required().min(6).messages({
      "string.base": "Password must be a string",
      "string.empty": "Password is required",
      "string.min": "Password must be at least 6 characters long",
    }),
    role: Joi.string().required().valid('admin', 'user').messages({
      "string.base": "Role must be a string",
      "string.empty": "Role is required",
      "any.only": "Role must be either 'admin' or 'user'",
    }),
  });

  return schema.validate(payload, { presence: "required" });
};


export const loginSchema = (payload) => {
    const schema = Joi.object({
      email: Joi.string()
      .email({
        minDomainSegments: 2,
      })
      .required().messages({
        "string.base": "Email must be a string",
        "string.empty": "Email is required",
      }),
      password: Joi.string().required().min(6).messages({
        "string.base": "Password must be a string",
        "string.empty": "Password is required",
        "string.min": "Password must be at least 6 characters long",
      }),
    });
  
    return schema.validate(payload, { presence: "required" });
  };