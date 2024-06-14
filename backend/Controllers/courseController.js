import asyncHandler from "../middlewares/asyncHandler.js";
import Course from "../models/Course.js";

const getQuestions = asyncHandler(async (req, res) => {
  let course = await Course.find({}).sort({ createdAt: -1 });
  console.log(course);
  res.status(200).json(course);
});

const addQuestion = asyncHandler(async (req, res) => {
  const { question, options, correctAnswer, solution } = req.body;
  console.log(question, options, correctAnswer, solution);

  const newQuestion = new Course({
    question,
    options,
    correctAnswer,
    hint: solution,
  });

  await newQuestion.save();
});

export { getQuestions, addQuestion };
