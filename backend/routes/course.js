import express from "express";
import { getQuestions, addQuestion } from "../Controllers/courseController.js";
import { shield } from "../middlewares/verify.js"
const router = express.Router();

// get all questions
router.route("/").get(shield, getQuestions)

// add Question
router.route("/").post(shield, addQuestion)

export default router;