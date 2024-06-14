import { useState } from "react";
import { FaBook } from "react-icons/fa";
import { Link } from "react-router-dom";

const SelectSubject = () => {
    const [selectedOption, setSelectedOption] = useState("");


    console.log(selectedOption);
  return (
    <>
      <div className="wrapper bg-white top-20 p-20 shadow-md">
        <div className="select  flex justify-between gap-10 border-b pb-5">
          <h3 className="flex items-center gap-2">
            Select Subject <FaBook />
          </h3>

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
        </div>
        <br />
        <Link to={`/quiz/:${selectedOption}`} className="bg-slate-900 text-slate-300 p-2 px-5 py-3 rounded-md">Enter</Link>
      </div>
    </>
  );
};

export default SelectSubject;
