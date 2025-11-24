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
}

export default ProblemService;