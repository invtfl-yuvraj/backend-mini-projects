import mongoose from "mongoose";

const problemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title cannot be empty"],
  },
  description: {
    type: String,
    required: [true, "Description cannot be empty"],
  },
  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    required: [true, "Difficulty level is required"],
    default: "Easy",
  },
  testCases: [
    {
      input: {
        type: String,
        required: [true, "Test case input cannot be empty"],
      },
      output: {
        type: String,
        required: [true, "Test case output cannot be empty"],
      },
    },
  ],
  editorial: {
    type: String,
    default: "",
  },
});

const Problem = mongoose.model("Problem", problemSchema);

export default Problem;
