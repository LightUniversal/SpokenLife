import React, { useState, useEffect } from "react";
import { FaStopwatch } from "react-icons/fa";
import { useParams } from "react-router-dom";

const Quiz = () => {
  const { id } = useParams();
  const [start, useStart] = useState(false);

  console.log(id);
  const questions = [
    {
      question: "What is the capital of France?",
      options: ["Paris", "Berlin", "Madrid", "Rome"],
      answer: "Paris",
      sn: 1,
    },
    {
      question: "What is 2 + 2?",
      options: ["3", "4", "5", "6"],
      answer: "4",
      sn: 2,

      solution: "2+2 = 4",
    },
    {
      question: "Who wrote 'To Kill a Mockingbird'?",
      options: ["Harper Lee", "Mark Twain", "Stephen King", "J.K. Rowling"],
      answer: "Harper Lee",
    },
    {
      question: "What is the chemical symbol for water?",
      options: ["H2O", "CO2", "O2", "CH4"],
      answer: "H2O",
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Venus", "Jupiter"],
      answer: "Mars",
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
      if (timeLeft == 4) {
        console.log("DONE");
      }
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
    <div>
      <div
        className="bg-gray-200  flex justify-around "
        style={{ height: "70vh" }}
      >
        {showScore ? (
          <div className="text-center">
            <div className="solutions"></div>
            <h2 className="text-3xl font-bold mb-4 ">Quiz Completed!</h2>
            <p className="text-lg mb-2 font-medium">
              Your score: {scorePercentage}%
            </p>
            <button
              className="bg-blue-500 shadow-sm hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
              onClick={restartQuiz}
            >
              Restart Quiz
            </button>
            <button className=" ml-5 bg-green-500 hover:bg-green-700 shadow-sm text-white font-bold py-2 px-4 rounded mt-4">
              All Workings
            </button>
          </div>
        ) : (
          <div className="p-4 rounded-lg">
            <div className="text-center mt-8 flex items-center flex-wrap gap-5 justify-between font-bold ">
              <p className="flex gap-1 border-2 p-3 items-center">
                <FaStopwatch className=" text-slate-900" /> Time Left:{" "}
                {Math.floor(timeLeft / 60)}:
                {timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}
              </p>
              <button className="start bg-blue-700 text-white p-2 rounded-sm px-5">
                Start
              </button>
              <div className="selectTime flex items-center gap-2 px-5">
                <span>Select Time</span>{" "}
                <select name="time" className="p-2 rounded-md px-5 cursor-pointer" id="time">
                  <option value="10">10 mins</option>
                  <option value="20">20 mins</option>
                  <option value="30">20 mins</option>
                </select>
              </div>
            </div>
            <div className=" mb-4 p-4 text-center border  rounded-lg">
              <h3 className=" text-xl flex text-slate-800 justify-between items-center  p-4 rounded-sm mb-5">
                Course Code : <span className=" p-2">GHS 102</span>
              </h3>

              <h2 className="text-lg text-center mb-5 border-slate-300 border py-5 font-medium text-slate-800">
                {questions[currentQuestion].question}
              </h2>
              <div className="mt-4 text-center px-1">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    className={`${
                      selectedOption === option
                        ? "bg-green-700 text-white"
                        : " text-black border border-slate-300 "
                    } hover:bg-green-700 hover:text-white  text-black font-medium py-2 px-4 rounded-md mr-2 mb-2`}
                    onClick={() => handleOptionSelect(option)}
                    // disabled={selectedOption !== ""}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-between px-1">
              <button
                className="bg-blue-700 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={handlePrev}
                disabled={currentQuestion === 0}
              >
                Prev
              </button>
              <button
                className="bg-blue-700 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={handleNext}
                disabled={selectedOption === ""}
              >
                {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
