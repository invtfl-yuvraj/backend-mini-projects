import { StatusCodes } from "http-status-codes";
import NotImplementedError from "../errors/notImplemented.error.js";
import { healthCheck } from "../utils/healthCheck.js";
import { ProblemService } from "../services/index.js";
import { ProblemRepository } from "../repositories/index.js";

const problemService = new ProblemService(new ProblemRepository());

export const pingProblemController = healthCheck("Problem Service Controller");

export const addProblem = async(req, res, next) => {
  try {
    
    console.log("Incoming request body:", req.body);
    const newProblem = await problemService.createProblem(req.body);
    
    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Problem created successfully",
      error: {},
      data: newProblem,
    });
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
