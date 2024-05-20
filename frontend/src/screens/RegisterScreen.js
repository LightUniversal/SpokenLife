import React, { useEffect, useState } from "react";
import {
  FaBookReader,
  FaBuilding,
  FaEnvelope,
  FaFacebook,
  FaLock,
  FaSignInAlt,
  FaTwitter,
  FaUser,
} from "react-icons/fa";
import { Form, useNavigate, Link } from "react-router-dom";
import { useRegisterMutation, useProfileImageMutation } from "../slices/userApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setCredentials } from "../slices/authSlice";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setConfirmPassword] = useState("");
  const [facebook, setFacebook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [name, setName] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoding }] = useRegisterMutation();
  const [profileImage, { isLoading: loadingProfileImage }] = useProfileImageMutation()
  const { userinfo } = useSelector((state) => state.auth);

  useEffect(
    () => {
      if (userinfo) {
        navigate("/");
      }
    },
    [userinfo, navigate]);
  const submitHandler = async (e) => {
    if (password !== cpassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register({
          email,
          password,
          name,
          facebook,
          twitter,
        }).unwrap();
        // The unwrap extracts values
        dispatch(setCredentials({ ...res }));
        navigate("/");
        toast.success("Welcome to Lu-Intelligence...");
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };

  const uploadProfileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await profileImage(formData).unwrap();
      toast.success(res.message);
      // setProfile(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  }
  return (
    <div>
      <Form
        className=" text-white w-4/5 mx-auto border border-slate-800 rounded-md shadow-md px-10 py-3"
        onSubmit={
          submitHandler
        }
      >
        <h2 className=" text-2xl text-center">
          Sign-Up
        </h2>
        <div className="name my-3">
          <label htmlFor="name" className="my-2 flex items-center text-green-400">
            Name <FaUser className=" mx-1 border text-2xl rounded-full p-1 border-slate-600" />
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className=" w-full h-16 rounded  bg-slate-700 px-4 text-slate-300"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="email py-2">
          <label htmlFor="email" className=" my-2 flex items-center text-green-400">
            Email <FaEnvelope className=" mx-1 border text-2xl rounded-full p-1 border-slate-600" />
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className=" w-full h-16 rounded  bg-slate-700 px-4 text-slate-300"
            placeholder="email address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="password my-2 py-3">
          <label
            htmlFor="password"
            className=" flex items-center text-green-400 my-2"
          >
            Password <FaLock className=" mx-1 border text-2xl rounded-full p-1 border-slate-600" />
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="w-full h-16 rounded  bg-slate-700 px-4 text-slate-300"
            placeholder="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="cpassword my-3 py-2">
          <label
            htmlFor="cpassword"
            className="my-2 flex items-center text-green-400"
          >
            Confirm Password <FaLock className=" mx-1 border text-2xl rounded-full p-1 border-slate-600" />
          </label>
          <input
            type="password"
            name="cpassword"
            id="cpassword"
            className="w-full h-16 rounded  bg-slate-700 px-4 text-slate-300"
            placeholder="confrim password"
            value={cpassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
        </div>
        <div className="faculty my-3 py-2">
          <label
            htmlFor="faculty"
            className="my-2 flex items-center text-green-400"
          >
            Lets Connect to Facebook <FaFacebook className=" relative -top-0.5 mx-2 border text-2xl rounded-full p-1 border-slate-600" />
          </label>
          <input
            type="text"
            name="facebook"
            id="facebook"
            className="w-full h-16 rounded  bg-slate-700 px-4 text-slate-300"
            placeholder="Enter your facebook name"
            value={facebook}
            onChange={(e) => {
              setFacebook(e.target.value);
            }}
          />
        </div>
        <div className="twitter my-3 py-2">
          <label
            htmlFor="twitter"
            className="my-2 flex items-center text-green-400"
          >
            Lets Connect to Twitter  <FaTwitter className=" relative -top-0.5 mx-2 border text-2xl rounded-full p-1 border-slate-600" />
          </label>
          <input
            type="text"
            name="twitter"
            id="twitter"
            className="w-full h-16 rounded  bg-slate-700 px-4 text-slate-300"
            placeholder="Enter your twitter username, eg: @username"
            value={twitter}
            onChange={(e) => {
              setTwitter(e.target.value);
            }}
          />
        </div>
        {/* <div className="profile my-3">
          <label
            htmlFor="profile"
            className=" flex items-center text-green-400"
          >
            Profile <FaUser className=" mx-1" />
          </label>
          <input type="file" name="image" id="image" onChange={uploadProfileHandler} className="w-full h-16 rounded  bg-slate-800 p-24 text-slate-300my-1"/>
          <input
            type="text"
            name="image"
            id="profile"
            className="w-full h-16 rounded  bg-slate-700 px-4 text-slate-300"
            placeholder="profile image url"
            value={profile}
            onChange={(e) => {
              setProfile(e.target.value);
            }}
          />
        </div> */}
        <div className="submit my-3">
          <button
            type="submit"
            className=" flex items-center bg-gray-950 py-3 px-5 border border-slate-800 text-white rounded shadow-sm"
          >
            Register <FaSignInAlt className=" mx-1 text-green-400" />
          </button>
        </div>
        <div className="register border-t font-medium text-sm border-slate-500 my-2 py-4">
          Already have an account?
          <Link to={"/login"} className=" bg-green-900 mx-2 my-1 p-3 px-5 rounded">
            Login
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default RegisterScreen;
