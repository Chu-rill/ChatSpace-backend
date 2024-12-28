"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultError = exports.invalidVerificationEmail = exports.invalidTokenError = exports.passwordMismatchError = exports.doesNotExistError = exports.handleValidationError = exports.noDuplicateError = void 0;
const http_status_1 = __importDefault(require("http-status"));
const noDuplicateError = {
    status: "error",
    error: true,
    message: "Already exists",
    statusCode: http_status_1.default.BAD_REQUEST,
};
exports.noDuplicateError = noDuplicateError;
const doesNotExistError = {
    status: "error",
    error: true,
    message: "Does not exist",
    statusCode: http_status_1.default.NOT_FOUND,
};
exports.doesNotExistError = doesNotExistError;
const passwordMismatchError = {
    status: "error",
    error: true,
    message: "Invalid password",
    statusCode: http_status_1.default.UNAUTHORIZED,
};
exports.passwordMismatchError = passwordMismatchError;
const invalidTokenError = {
    status: "error",
    error: true,
    message: "Invalid token",
    statusCode: http_status_1.default.UNAUTHORIZED,
};
exports.invalidTokenError = invalidTokenError;
const invalidVerificationEmail = {
    status: "error",
    error: true,
    message: "Invalid verification email",
    statusCode: http_status_1.default.INTERNAL_SERVER_ERROR,
};
exports.invalidVerificationEmail = invalidVerificationEmail;
const defaultError = {
    status: "error",
    error: true,
    message: "Internal Server Error",
    statusCode: http_status_1.default.INTERNAL_SERVER_ERROR,
};
exports.defaultError = defaultError;
const handleValidationError = (err) => {
    const { errors } = err;
    const errorFields = Object.keys(errors);
    return {
        status: "error",
        error: true,
        message: "Invalid Fields",
        fields: errorFields,
        statusCode: http_status_1.default.BAD_REQUEST,
    };
};
exports.handleValidationError = handleValidationError;
