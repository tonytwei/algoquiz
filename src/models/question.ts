import { Schema, model, models } from "mongoose";

const exampleSchema = new Schema({
  input: String,
  output: String,
});

const questionPartSchema = new Schema({
  questionText: String,
  answer: Number,
  options: [String],
});

const questionSchema = new Schema({
  id: String,
  title: String,
  difficulty: String,
  topics: [String],
  sets: [String],
  description: String,
  examples: [exampleSchema],
  constraints: [String],
  questions: [questionPartSchema],
});

const Question = models.Question || model("Question", questionSchema);
export default Question;
