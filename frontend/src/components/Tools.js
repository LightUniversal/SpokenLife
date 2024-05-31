import React from 'react'
import { FaBook, FaBookReader, FaTools } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function Tools() {
  return (
    <div className="others w-3/5 bg-slate-900  absolute z-100 top-6 border border-slate-800 rounded-md  p-3 right-4 md:w-2/12">
              <h2 className=" flex gap-2 border-b p-3 border-slate-700 items-center text-slate-400 ">
                Tools <FaTools />
              </h2>
              <div className=" flex flex-col text-slate-400 gap-5 mt-5
              ">
                <Link className="flex items-center gap-2 border-b p-3 border-slate-700">
                  Learning Center <FaBookReader className=" text-green-300 border rounded-full  text-xl p-1"/>
                </Link>
                <Link className="flex gap-2 items-center p-3 ">
                  Library <FaBook className=" text-green-300 border rounded-full  text-xl p-1" />
                </Link>
              </div>
          </div>
  )
}

export default Tools
