import React, { useState } from "react";
import { useAddQuestionMutation } from "../slices/questionsSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Earn = () => {
  const [question, setQuestion] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [solution, setSolution] = useState("");

  const [addQuestion, { isLoading: loading, error: isError }] =
    useAddQuestionMutation();
  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const questionData = {
      question,
      options,
      correctAnswer,
      solution,
    };

    console.log(questionData);
    try {
      await addQuestion(questionData).unwrap();

      alert("Question added successfully");
      toast.success("Question added successfully");

      setQuestion("");
      setOptions(["", "", "", ""]);
      setCorrectAnswer("");
      setSolution("");
    } catch (error) {
      console.error("Error:", error);
      alert("Error adding question");
      toast.error(error?.data.message || error.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-slate-100 relative top-2 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Add a New Question</h2>
      <h4>
        Select Question
      </h4>
      <select
            name="subjects"
            className=" cursor-pointer border p-2 rounded-md"
            id="subjects"
            value={selectedOption}
            onChange={(e) => {setSelectedOption(e.target.value)}}
          >
            <option value="igbo">Igbo</option>
            <option value="ich102">ICH 102</option>
            <option value="phy102">PHY 102</option>
            <option value="mat102">MAT 102</option>
          </select>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Question:</label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Options:</label>
          {options.map((option, index) => (
            <input
              key={index}
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded w-full mb-2"
              required
            />
          ))}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Correct Answer:</label>
          <input
            type="text"
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Solution:</label>
          <textarea
            value={solution}
            onChange={(e) => setSolution(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
        >
          Add Question
        </button>
        <Link to={"/quiz/:"} className=" bg-black rounded-md text-white p-2 px-4 absolute right-5">
          start test
        </Link>
      </form>
    </div>
  );
};

export default Earn;
