"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchema = void 0;
const validateSchema = (schema) => {
    return (req, res, next) => {
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
exports.validateSchema = validateSchema;
