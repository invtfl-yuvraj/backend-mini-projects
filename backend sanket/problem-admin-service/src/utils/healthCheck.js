import { StatusCodes } from "http-status-codes";

export const healthCheck = (serviceName) => (req, res) => {
  res.status(StatusCodes.OK).json({
    success: true,
    message: `${serviceName} is alive`,
  });
};
