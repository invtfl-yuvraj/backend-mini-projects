import { StatusCodes } from "http-status-codes";

export const pingProblemController = (req, res) => {
  return res
    .status(StatusCodes.OK)
    .json({ message: "Problem controller is alive" });
};

export const addProblem = (req, res) => {
  return res.status(StatusCodes.NOT_IMPLEMENTED).json({
    message: "Not implemented",
  });
};

export const getAllProblems = (req, res) => {
  return res.status(StatusCodes.NOT_IMPLEMENTED).json({
    message: "Not implemented",
  });
};

export const getProblemById = (req, res) => {
  return res.status(StatusCodes.NOT_IMPLEMENTED).json({
    message: "Not implemented",
  });
};

export const updateProblemById = (req, res) => {
  return res.status(StatusCodes.NOT_IMPLEMENTED).json({
       message: "Not implemented"
  });
};

export const deleteProblemById = (req, res) => {
  return res.status(StatusCodes.NOT_IMPLEMENTED).json({
    message: "Not implemented",
  });
};
