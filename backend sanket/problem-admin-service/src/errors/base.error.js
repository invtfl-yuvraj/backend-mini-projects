class BaseError extends Error {
  constructor(name, statusCode, message, details) {
    super(message);

    this.name = name;
    this.statusCode = statusCode;
    this.details = details || null;

    // Capture clean stack trace
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default BaseError;
