import mongoose from "mongoose";

const questionSchema = mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    options: {
        type: Array,
        default:[],
        required: true
    },
    correctAnswer: {
        type: String,
        required: true
    },
    hint: {
        type: String,
        required: true
    }
});


const Course = mongoose.model("Course", questionSchema);

export default Course;