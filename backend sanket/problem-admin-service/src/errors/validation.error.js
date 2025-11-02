import BaseError from "./base.error.js";
import { StatusCodes } from "http-status-codes";

class ValidationError extends BaseError {
  constructor(field, details = {}) {
    super(
      "ValidationError",
      StatusCodes.BAD_REQUEST,
      `Validation failed for ${field}`,
      details
    );
  }
}

export default ValidationError;
