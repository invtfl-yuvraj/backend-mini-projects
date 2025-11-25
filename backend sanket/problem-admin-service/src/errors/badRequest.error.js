import BaseError from "./base.error.js";
import { StatusCodes } from "http-status-codes";

class BadRequestError extends BaseError {
  constructor(propertyName, details = {}) {
    super(
      "BadRequestError",
      StatusCodes.BAD_REQUEST,
      `Invalid value for '${propertyName}'`,
      details
    );
  }
}

export default BadRequestError;
