import BaseError from "../errors/base.error.js";
import { StatusCodes } from "http-status-codes";
import SERVER_CONFIG from "../config/server.config.js";

const isDev = SERVER_CONFIG.NODE_ENV !== 'production';

export function errorHandler(err, req, res, next) {
    if (err instanceof BaseError){
        return res.status(err.statusCode).json({
            success: false,
            error: {
                name: err.name,
                message: err.message,
                details: isDev ? err.details : undefined
            },
            data: {} // no data on error
        });
    }

    console.error("Unhandled Error:", err);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        error: {
            name: "InternalServerError",
            message: "An unexpected error occurred",
            details: isDev ? err.stack : undefined,
        },
        data: {} // no data on error
    });
}