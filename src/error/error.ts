import httpStatus from "http-status";

type ErrorResponse = {
  status: string;
  error: boolean;
  message: string;
  statusCode: number;
  fields?: string[]; // Optional, only for validation errors
};

const noDuplicateError: ErrorResponse = {
  status: "error",
  error: true,
  message: "Already exists",
  statusCode: httpStatus.BAD_REQUEST,
};

const doesNotExistError: ErrorResponse = {
  status: "error",
  error: true,
  message: "Does not exist",
  statusCode: httpStatus.NOT_FOUND,
};

const passwordMismatchError: ErrorResponse = {
  status: "error",
  error: true,
  message: "Invalid password",
  statusCode: httpStatus.UNAUTHORIZED,
};

const invalidTokenError: ErrorResponse = {
  status: "error",
  error: true,
  message: "Invalid token",
  statusCode: httpStatus.UNAUTHORIZED,
};

const invalidVerificationEmail: ErrorResponse = {
  status: "error",
  error: true,
  message: "Invalid verification email",
  statusCode: httpStatus.INTERNAL_SERVER_ERROR,
};

const defaultError: ErrorResponse = {
  status: "error",
  error: true,
  message: "Internal Server Error",
  statusCode: httpStatus.INTERNAL_SERVER_ERROR,
};

const handleValidationError = (err: any): ErrorResponse => {
  const { errors } = err;
  const errorFields = Object.keys(errors);

  return {
    status: "error",
    error: true,
    message: "Invalid Fields",
    fields: errorFields,
    statusCode: httpStatus.BAD_REQUEST,
  };
};

export {
  noDuplicateError,
  handleValidationError,
  doesNotExistError,
  passwordMismatchError,
  invalidTokenError,
  invalidVerificationEmail,
  defaultError,
};
