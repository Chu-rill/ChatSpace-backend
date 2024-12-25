import Joi from "joi";

// Register validator schema
export const register_query_validator = Joi.object({
  username: Joi.string().required().messages({
    "string.base": "Username must be a string",
    "string.empty": "Username is required",
    "any.required": "Username is a required field",
  }),
  password: Joi.string().required().messages({
    "string.base": "Password must be a string",
    "string.empty": "Password is required",
    "any.required": "Password is a required field",
  }),
  email: Joi.string().email().required().messages({
    "string.base": "Email must be a string",
    "string.empty": "Email is required",
    "any.required": "Email is a required field",
  }),
});

// Login validator schema
export const login_query_validator = Joi.object({
  username: Joi.string().required().messages({
    "string.base": "Username must be a string",
    "string.empty": "Username is required",
    "any.required": "Username is a required field",
  }),
  password: Joi.string().required().messages({
    "string.base": "Password must be a string",
    "string.empty": "Password is required",
    "any.required": "Password is a required field",
  }),
});
