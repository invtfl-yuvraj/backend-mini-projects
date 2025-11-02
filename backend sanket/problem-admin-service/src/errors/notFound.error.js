import BaseError from "./base.error.js";
import { StatusCodes } from "http-status-codes";

class NotFoundError extends BaseError {
  constructor(resource, details = {}) {
    super(
      "NotFoundError",
      StatusCodes.NOT_FOUND,
      `${resource} not found`,
      details
    );
  }
}

export default NotFoundError;
