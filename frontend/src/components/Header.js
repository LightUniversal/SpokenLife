import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserProfileDropdownMenu from "./UserProfileDropdownMenu";
import SearchBox from "./SearchBox";
import {
  FaBars,
  FaBell,
  FaBookReader,
  FaCaretDown,
  FaCommentAlt,
  FaSearch,
  FaTimes,
  FaToolbox,
  FaTools,
  FaUser,
} from "react-icons/fa";
import { useState, useRef } from "react";
import { useSelector } from "react-redux";

function Header( { toggleTools }) {
  const [userMenu, setUserMenu] = useState(false);

  const { userinfo } = useSelector((state) => state.auth);
  // if (userinfo) console.log(userinfo);

  const Toggler = function () {
    // setUserMenu(!userMenu);
    if (userMenu) {
      setUserMenu(false);
    } else {
      setUserMenu(true);
    }

    console.log(userMenu);
  };

  
  return (
    <header className=" bg-black  fixed w-full top-0 header">
      <div className=" flex header   justify-between items-center mx-auto  bg-black py-5 px-4">
        <div className="logo  py-0">
          <Link
            to="/"
            className="linklogo text-cente text-sm  rounded-sm shadow-lg text-white font-medium mx-4  block relative -left-5 p-2 -top-0"
            style={{ width: "", cursor: "pointer" }}
          >
            {/* <img src="/images/elogo.png" alt="" className="siteLogo p-3" /> */}
            Lu-Intelligence
          </Link>
        </div>
        {userinfo && (
          <>
            <div className="saerchBox w-3/5 relative hidden md:block -top-6">
              <input
                type="search"
                name="search"
                id="search"
                placeholder="Search ..."
                className=" text-slate-300 w-full absolute px-5 py-4 bg-black border border-slate-800 rounded-md"
              />
              <button className="absolute top-3 rounded-full border border-slate-600 p-2 right-3">
                <FaSearch className=" text-slate-400" />
              </button>
            </div>
            <div className="right -mr-2">
              <ul className="link-items">
                {/* <li className="relative">
                <Link to="/practice">
                  <FaBookReader className="  p-2 shadow-sm  text-white bg-slate-900  border-slate-800 border  shadow-slate-900 rounded-full text-3xl" />
                </Link>
              </li> */}
                {/* <li className="relative hidden">
              <Link to="#">
                <FaCommentAlt className="  p-2 shadow-sm  text-green-500 bg-slate-700  shadow-slate-900 rounded-full text-3xl" />
              </Link>
              <span className=" flex justify-center shadow-sm shadow-green-950 text-green-300 items-center text-xs font-bold -top-2 rounded-full bg-slate-600 absolute -right-2" style={{width:"20px", height:"20px"}}> 3 </span>
            </li> */}
                {/* <li className="relative">
                <Link to="#">
                  <FaBell className="  p-2 shadow-sm text-white border-slate-800 border text-center bg-slate-900   rounded-full text-3xl" />
                  <span
                    className=" flex justify-center shadow-sm  text-black items-center text-xs font-bold -top-2 rounded-full bg-slate-400 absolute -right-2 px-2 py-2"
                    style={{ width: "20px", height: "20px" }}
                  >
                    {" "}
                    3{" "}
                  </span>
                </Link>
              </li> */}
                {/* <li
                  className=" gap-2  cursor-pointer text-xs   flex items-center  font-bold text-slate-500 py-3 px-4  shadow-md border-b border-slate-800 "
                  onClick={toggleTools}
                >
                  Tools
                </li> */}
                <li
                  className="  cursor-pointer text-xs break-words  flex items-center justify-between font-bold text-slate-500 py-3 px-3  shadow-md border border-slate-800 "
                  id="userprofile"
                  onClick={Toggler}
                >
                  {/* <img
                src={userinfo.profile}
                alt="user profile image"
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                }}
                id="userprofileimage"
                className=" shadow-lg align-middle inline-block"
              /> */}
                  <FaUser className="shadow-lg align-middle inline-block mx-1 text-white border border-slate-700 text-3xl p-1 rounded-full" />
                  <span className=" break-words">
                    {String(userinfo.name).slice(0, 5) + "..."}
                  </span>
                  <FaCaretDown className=" text-center text-slate-200 ml-2 inline-block align-middle relative -top-0.5" />
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
      {userMenu && <UserProfileDropdownMenu />}
    </header>
  );
}

export default Header;
