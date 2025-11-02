import { StatusCodes } from "http-status-codes";
import NotImplementedError from "../errors/notImplemented.error.js";
import { healthCheck } from "../utils/healthCheck.js";

export const pingProblemController = healthCheck("Problem Service Controller");

export const addProblem = (req, res, next) => {
  try {
    throw new NotImplementedError("addProblem", { reason : "Functionality is pending...", requestBody: req.body });
  } catch (error) {
    next(error);
  }

};

export const getAllProblems = (req, res, next) => {
  try {
    throw new NotImplementedError("addProblem", { reason : "Functionality is pending..." });
  } catch (error) {
    next(error);
  }
};

export const getProblemById = (req, res, next) => {
  try {
    throw new NotImplementedError("getProblemById", { reason : "Functionality is pending..." });
  } catch (error) {
    next(error);
  }
};

export const updateProblemById = (req, res, next) => {
  try {
    throw new NotImplementedError("updateProblemById", { reason : "Functionality is pending..." });
  } catch (error) {
    next(error);
  }
};

export const deleteProblemById = (req, res, next) => {
  try {
    throw new NotImplementedError("deleteProblemById", { reason : "Functionality is pending..." });
  } catch (error) {
    next(error);
  }
};
