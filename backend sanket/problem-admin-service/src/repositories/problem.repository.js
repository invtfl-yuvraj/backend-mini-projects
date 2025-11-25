import { Problem } from "../models/index.js";
import NotFoundError from "../errors/notFound.error.js";
import logger from "../config/logger.config.js";

class ProblemRepository {
  async createProblem(problemData) {
    try {
      const problem = await Problem.create({
        title: problemData.title,
        description: problemData.description,
        testCases: problemData.testCases ? problemData.testCases : [],
      });
      return problem;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getAllProblems() {
    try {
      const problems = await Problem.find();
      return problems;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getProblemById(problemId) {
    try {
      logger.info(`Problem.Repository: Fetching problem with ID: ${problemId}`);

      const problem = await Problem.findById(problemId);

      if (!problem) {
        logger.error(`Problem.Repository: Problem with ID ${problemId} not found.`);
        throw new NotFoundError(problemId, { reason: "Invalid problem ID" });
      }
      return problem;
    } catch (error) {
      if (error.name === "CastError") {
        logger.error(`Problem.Repository: Problem with ID ${problemId} not found.`);
        throw new NotFoundError(problemId, { reason: "Invalid problem ID" });
      }
      logger.error(`Problem.Repository: Error occurred while fetching problem with ID ${problemId}: ${error.message}`);
      throw error;
    }
  }

  async deleteProblemById(problemId) {
    try {
      const result = await Problem.findByIdAndDelete(problemId);
      if (!result) {
        logger.error(`Problem.Repository: Problem with ID ${problemId} not found for deletion.`);
        throw new NotFoundError(problemId, { reason: "Invalid problem ID" });
      }
      return result;
    } catch (error) {
      if (error.name === "CastError") {
        logger.error(`Problem.Repository: Problem with ID ${problemId} not found for deletion.`);
        throw new NotFoundError(problemId, { reason: "Invalid problem ID" });
      }
      logger.error(`Problem.Repository: Error occurred while deleting problem with ID ${problemId}: ${error.message}`);
      throw error;
    }
  }
}

export default ProblemRepository;
