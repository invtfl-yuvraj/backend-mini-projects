import BaseError from "./base.error.js";
import { StatusCodes } from "http-status-codes";

class AuthError extends BaseError {
  constructor(details = {}) {
    super(
      "AuthError",
      StatusCodes.UNAUTHORIZED,
      "Authentication failed",
      details
    );
  }
}

export default AuthError;
