import { Problem } from "../models/index.js";
import NotFoundError from "../errors/notFound.error.js";

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
      console.log("Fetching problem with ID:", problemId);

      const problem = await Problem.findById(problemId);

      if (!problem) {
        throw new NotFoundError(problemId, { reason: "Invalid problem ID" });
      }
      return problem;
    } catch (error) {
      if (error.name === "CastError") {
        throw new NotFoundError(problemId, { reason: "Invalid problem ID" });
      }
      console.log(error);
      throw error;
    }
  }
}

export default ProblemRepository;
