import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi"; // Import the Joi schema type

export const validateSchema = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(422).json({
        status: false,
        data: [],
        message: error.details[0].message,
      });
    }
    next();
  };
};
