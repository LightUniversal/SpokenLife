import React, { useState, useEffect } from "react";
import { FaStopwatch } from "react-icons/fa";

const Quiz = () => {
  const questions = [
    {
      question: "What is the capital of France?",
      options: ["Paris", "Berlin", "Madrid", "Rome"],
      answer: "Paris"
    },
    {
      question: "What is 2 + 2?",
      options: ["3", "4", "5", "6"],
      answer: "4"
    },
    {
      question: "Who wrote 'To Kill a Mockingbird'?",
      options: ["Harper Lee", "Mark Twain", "Stephen King", "J.K. Rowling"],
      answer: "Harper Lee"
    },
    {
      question: "What is the chemical symbol for water?",
      options: ["H2O", "CO2", "O2", "CH4"],
      answer: "H2O"
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Venus", "Jupiter"],
      answer: "Mars"
    }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    if (selectedOption === questions[currentQuestion].answer) {
      setScore(score + 1);
    }

    setSelectedOption("");
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowScore(true);
    }
  };

  const handlePrev = () => {
    setSelectedOption("");
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const restartQuiz = () => {
    setShowScore(false);
    setCurrentQuestion(0);
    setSelectedOption("");
    setScore(0);
    setTimeLeft(300);
  };

  const scorePercentage = Math.round((score / questions.length) * 100);

  return (
    <div className="bg-gray-200  flex flex-col justify-center items-center" style={{ height:"70vh"}}>
      {showScore ? (
        <div className="text-center">
            <div className="solutions">
                
            </div>
          <h2 className="text-3xl font-bold mb-4">Quiz Completed!</h2>
          <p className="text-lg mb-2 font-medium">Your score: {scorePercentage}%</p>
          <button
            className="bg-blue-500 shadow-sm hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={restartQuiz}
          >
            Restart Quiz
          </button><button className=" ml-5 bg-green-500 hover:bg-green-700 shadow-sm text-white font-bold py-2 px-4 rounded mt-4">
                    All Workings
                </button>
        </div>
      ) : (
        <div>
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold">{questions[currentQuestion].question}</h2>
            <div className="mt-4">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  className={`${
                    selectedOption === option ? "bg-blue-500 text-white" : "bg-gray-300"
                  } hover:bg-blue-700 text-black font-bold py-2 px-4 rounded mr-2 mb-2`}
                  onClick={() => handleOptionSelect(option)}
                  disabled={selectedOption !== ""}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
          <div className="flex justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
              onClick={handlePrev}
              disabled={currentQuestion === 0}
            >
              Prev
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
              onClick={handleNext}
              disabled={selectedOption === ""}
            >
              {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
            </button>
          </div>
        </div>
      )}
      <div className="text-center mt-8   font-bold ">
        <p className="text-center mt-8 flex gap-1 bg-slate-200 p-3 items-center"> <FaStopwatch className=" text-slate-400" /> Time Left: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}</p>
      </div>
    </div>
  );
};

export default Quiz;
