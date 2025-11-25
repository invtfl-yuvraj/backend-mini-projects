import { sanitizeMarkdownContent } from "../utils/markDownSanitizer.js";

class ProblemService{

    constructor(problemRepository){
        this.problemRepository = problemRepository;
    }

    async createProblem(problemData){

        try {

            problemData.description = sanitizeMarkdownContent(problemData.description);

            console.log("problemData", problemData);
            // Save the problem data to the repository
            const problem = await this.problemRepository.createProblem(problemData);

            console.log("Created problem:", problem);

            return problem;
        } catch (error) {
            console.error("Error creating problem:", error);
            throw error;
        }
    }

    async getAllProblems() {

        try {
            const problems = await this.problemRepository.getAllProblems();
            return problems;
            
        } catch (error) {
            console.error("Error fetching all problems:", error);
            throw error;
        }
    }

    async getProblemById(problemId) {

        try {
            const problem = await this.problemRepository.getProblemById(problemId);
            return problem;
            
        } catch (error) {
            console.error(`Error fetching problem with ID ${problemId}:`, error);
            throw error;
        }
    }

    async deleteProblemById(problemId) {

        try {
            const result = await this.problemRepository.deleteProblemById(problemId);
            return result;
            
        } catch (error) {
            console.error(`Error deleting problem with ID ${problemId}:`, error);
            throw error;
        }
    }
}

export default ProblemService;