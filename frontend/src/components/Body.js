import { useEffect, useRef, useState } from "react";
import "animate.css";
import { toast } from "react-toastify";
import { Form, Link, useNavigate, useLocation } from "react-router-dom";
import Loader from "./Loader.js";

import React from "react";
import {
  FaBook,
  FaBookReader,
  FaCommentAlt,
  FaCommentDots,
  FaEdit,
  FaEllipsisH,
  FaFacebook,
  FaImage,
  FaMinus,
  FaPlus,
  FaRegBuilding,
  FaRunning,
  FaShareAlt,
  FaSignInAlt,
  FaThumbsUp,
  FaTools,
  FaTrashAlt,
  FaTwitter,
  FaUser,
  FaUserAlt,
  FaUserPlus,
  FaWhatsapp,
} from "react-icons/fa";
import {
  useAddPostMutation,
  useGetAllPostQuery,
  useLikeAPostMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
  useCreateViewMutation,
} from "../slices/postApiSlice.js";
import {
  useGetUsersQuery,
  useAddRemoveFriendMutation,
} from "../slices/userApiSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice.js";

const Body = () => {
  const [description, setDescription] = useState("");
  const [comment, setComment] = useState("");
  const [picturePath, setPicturePath] = useState("");
  const [notification, setNotification] = useState(true);

  const location = useLocation();
  const currentUrl = location.pathname;
  // console.log(currentUrl + "images/blogo.png");
  const showComments = useRef();

  const dispatch = useDispatch();

  const { data, isLoading, error, refetch } = useGetAllPostQuery();
  const { users, isLoading: loadingUsers, error: err } = useGetUsersQuery();
  const [addPost, { isLoading: loading, error: isError }] =
    useAddPostMutation();
  const [likePost, { isLoading: loadingLikes }] = useLikeAPostMutation();
  const [addRemoveFriend, { isLoading: loadingfriends }] =
    useAddRemoveFriendMutation();
  const [deletePost, { isLoading: loadingDeletePost }] =
    useDeletePostMutation();

  const [updatePost, { isLoading: isLoadingUpdatedPost }] =
    useUpdatePostMutation();
  const [createView, { isLoading: loadingViews }] = useCreateViewMutation();

  const navigate = useNavigate();
  const { userinfo } = useSelector((state) => state.auth);
  // if(  == null) {
  //   navigate("/")
  // }

  const addPostHandler = async (e) => {
    e.preventDefault();

    try {
      await addPost({
        description,
        picturePath,
        userId: userinfo._id,
      }).unwrap();
      refetch();
      setDescription("");
    } catch (err) {
      toast.error(err?.data.message || err.message);
    }
  };

  const likePostHandler = async (id) => {
    const userId = userinfo._id;
    try {
      console.log(id, userId);
      await likePost({ id, userId });
      refetch();
    } catch (error) {
      console.log(error.message);
    }
  };

  const addRemoveFriendHandler = async (friendId) => {
    try {
      const res = await addRemoveFriend({
        userId: userinfo._id,
        friendId,
      });
      dispatch(setCredentials(res.data));
      refetch();
      if (userinfo.friends.includes(friendId)) {
        toast.success("Removed from friend List");
      } else {
        toast.success("Added to friend List");
      }
    } catch (error) {}
  };

  const deleteHandler = async (id) => {
    try {
      await deletePost(id);
      refetch();
      toast.success("Post deleted");
    } catch (error) {}
  };

  const updatePostHandler = async (description, id) => {
    setDescription(description);
    try {
      await updatePost({
        id,
        description,
        userId: userinfo._id,
      });
      toast.success("Post updated successfully");
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  const createViewsHandler = async (e, id) => {
    e.preventDefault();

    try {
      if (comment !== "") {
        await createView({
          id: id,
          comment: comment,
        }).unwrap();
        refetch();
        e.target.view.value = "";
      } else {
        toast.error("Please write your view");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteViewHandler = async (id, viewId) => {
    try {
      await deleteViewHandler(id, viewId);
      refetch();
      toast.success("View deleted successfully");
    } catch (error) {
      console.log("error");
    }
  };

  const toggleAccordion = (e) => {
    console.log(
      e.target.parentElement.parentElement.firstElementChild.nextElementSibling
        .nextElementSibling
    );
  };

  return (
    <>
      {userinfo ? (
        <div className="wrapper">
          {isLoading ? (
            <Loader />
          ) : error ? (
            <h2>{error.message}</h2>
          ) : (
            <>
            <div className="mainbody mx-1.5">
              <div className="userpost py-4 shadow-sm px-3 rounded-md bg-black">
                <div className="userposts bg-slate-900 flex justify-between shadow-sm rounded-sm items-center w-full  py-4 px-3 ">
                  <div className="user mx-2 shadow-sm">
                    {/* <img
                      src={userinfo.profile}
                      alt="user profile "
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                      }}
                      className=" shadow-lg"
                    /> */}
                    <FaUser className=" text-white border relative -top-1 border-slate-500 text-4xl p-1 rounded-full" />
                  </div>
                  <div className="postinput w-4/5 mx-auto">
                    <Form
                      id="post"
                      className=""
                      onSubmit={(e) => addPostHandler(e)}
                    >
                      <textarea
                        type="text"
                        placeholder="what's on your mind? 
                        use # to include links"
                        className=" h-32 font-medium w-full p-5 px-10  text-slate-400 bg-slate-950 rounded shadow-lg postInput"
                        name="post"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        style={{ border: "none" }}
                      ></textarea>
                    </Form>
                  </div>
                </div>
                <div className="attachments py-2 flex justify-between relative -top-1  mt-2  ">
                  <div className="image">
                    {/* <input
                    type="file"
                    name="image"
                    id="image"
                    value={picturePath}
                    className=" bg-white absolute"
                    style={{ visibility: "hidden" }}
                    ref={fileElement}
                  /> */}
                    {/* <Link
                      to="/"
                      className=" flex items-center bg-slate-800 font-bold text-xs py-2 px-3 text-green-400 rounded shadow-sm"
                    >
                      <FaImage className=" align-middle mx-1 text-green-400" />
                      Image
                    </Link> */}
                  </div>
                  <div className="submitPost">
                    <button
                      type="submit"
                      className="submitbtn bg-slate-800 text-xs font-bold py-3 px-4 text-green-400 rounded shadow-sm"
                      onClick={(e) => addPostHandler(e)}
                    >
                      Post
                    </button>
                  </div>
                </div>
              </div>
              {/* Post */}
              {data.map((post) => (
                <div
                  className="posts bg-black px-4 py-5 my-4 rounded-md "
                  key={post._id}
                >
                  <div className="uppersection flex justify-between items-center shadow-sm shadow-slate-900 py-3 px-3 rounded-lg">
                    <div className="userdetails p-2 flex items-center cursor-pointer">
                      {/* <img
                        src={`${currentUrl}${post.profile}`}
                        alt=""
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                        }}
                      /> */}
                      <Link to={`/profile/${post.userId}`}>
                        <FaUser className=" text-white border border-slate-700 shadow-md text-3xl p-2 rounded-full" />
                      </Link>
                      {
                        post.twitter && (
                          <Link
                        to={`https://twitter.com/${post.twitter}`}
                        className="details mx-2 relative"
                      >
                        <span className=" bg-slate-950 px-2 py-1 rounded-sm text-xs inline-block mb-1 text-white shadow-md">
                          {post.name}
                        </span>

                        <span className=" bg-gray-950 flex items-center px-2 py-1 text-xs rounded-sm text-slate-400 shadow-md">
                          <FaTwitter className=" text-green-100 mr-1" />{" "}
                          {post.twitter}
                        </span>
                      </Link>
                        )
                      }
                    </div>
                    <div className="addremovefriend ">
                      <Link
                        to={`https://www.facebook.com/${post.facebook}`}
                        className="userexists text-green-600 flex items-center"
                      >
                        <FaFacebook className=" relative -right-2" />
                        <FaUserPlus className="addremovefriend text-4xl cursor-pointer bg-slate-800 text-green-500 p-2 rounded-full shadow-sm" />
                      </Link>
                    </div>
                  </div>
                  <div className="textposted relative animate__animated animate__bounceIn  text-black  shadow-md  py-3 text-sm bg-slate-950 mt-3 rounded-lg px-2 font-medium">
                    <span className="inline-block bg-slate-900 w-full py-10 px-5 rounded text-slate-300 font-medium shadow-md text-sm">
                      {post.description.slice(0, post.description.indexOf("#"))}

                      {post.description.includes("#") && (
                        <Link
                          to={post.description.slice(
                            Number(post.description.indexOf("#")) + 1,
                            post.description.length
                          )}
                          className="block mt-2 text-blue-700"
                        >
                          {post.description.slice(
                            post.description.indexOf("#"),
                            post.description.length
                          )}
                        </Link>
                      )}
                    </span>

                    {userinfo._id === post.userId && (
                      <div>
                        <span
                          onClick={() => deleteHandler(post._id)}
                          className="delete cursor-pointer absolute bottom-1 bg-gray-800 flex shadow-lg rounded-md right-1 items-center p-2 text-red-700 text-xs font-bold"
                        >
                          <FaTrashAlt />
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="imagePosted -my-1">
                    {/* <img
                  src="/images/Lu.jpg"
                  className="shadow-md bg-green-50 rounded-2xl"
                  alt="photo posted"
                  style={{ width: "100%", height: "100%" }}
                /> */}
                  </div>
                  <div className="actions bg-slate-950 py-3 px-3 rounded-md flex w-full mt-2 justify-between">
                    <span className="date inline-block cursor-pointer border border-dashed border-slate-800  bottom-1 bg-gray-950  shadow-sm rounded items-center p-2  text-white text-xs font-medium">
                      {post.createdAt}
                    </span>
                    <Form className="flex items-center">
                      <span className=" flex mx-5">
                        <FaEllipsisH className=" text-slate-600 cursor-pointer"  />
                      </span>
                      {post.likes.includes(userinfo._id) ? (
                        <span
                          className=" bg-slate-900 cursor-pointer flex shadow-md rounded-full items-center p-2 text-green-700 text-xs font-bold"
                          onClick={() => {
                            likePostHandler(post._id);
                          }}
                        >
                          <FaThumbsUp className=" mx-1 " /> {post.likes.length}
                        </span>
                      ) : (
                        <span
                          className=" bg-slate-950 cursor-pointer flex shadow-md rounded-full items-center p-2 text-white text-xs font-bold"
                          onClick={() => {
                            likePostHandler(post._id);
                          }}
                        >
                          <FaThumbsUp className=" mx-1 " /> {post.likes.length}
                        </span>
                      )}
                      {post.comments.length > 0 ? (
                        <span className=" mx-2 bg-slate-900 flex shadow-md rounded-full items-center p-2 text-green-700 text-xs font-bold">
                          <FaCommentAlt className=" mx-1" />
                          {post.comments.length}
                        </span>
                      ) : (
                        <span className=" mx-2 bg-slate-950 flex shadow-md rounded-md items-center p-2 text-slate-700 text-xs font-bold">
                          <FaCommentAlt className=" mx-1" />
                          {post.comments.length}
                        </span>
                      )}
                      <div className="share bg-slate-950 flex shadow-md rounded-md items-center text-slate-700 text-xs font-bold relative -right-2">
                        <Link
                          className="flex items-center p-2"
                          to={`whatsapp://send?text=${post.description}`}
                          data-action="share/whatsapp/share"
                        >
                          <FaShareAlt className=" mx-1" /> share
                          <FaWhatsapp className="mx-1 font-bold text-green-500" />
                        </Link>
                      </div>
                    </Form>
                  </div>
                  {/* comment box */}
                  <Form
                    className="commentarea bg-slate-950 mt-1 p-1 rounded-lg relative"
                    onSubmit={(e) => createViewsHandler(e, post._id)}
                  >
                    <h6 className="flex items-center  text-slate-500  text-xs -mb-0.5 mx-2  pt-5 border-b border-slate-800 p-1">
                      Views <FaCommentAlt className="mx-2" />
                    </h6>
                    {/* {post.comments.length > 0 && (
                      <span className="absolute top-4 cursor-pointer text-xs bg-green-950 rounded-full p-1 right-4">
                        {isCollapsed ? (
                          <FaPlus
                            className="toggle plus text-white"
                            id={post._id}
                            onClick={(e) => toggleAccordion(e)}
                          />
                        ) : (
                          <FaMinus
                            className="toggle minus text-white"
                            id={post._id}
                            onClick={(e) => toggleAccordion(e)}
                          />
                        )}
                      </span>
                    )} */}
                    <div className="py-1 rounded-m">
                      {post.comments.map((comment, index) => (
                        <div
                          className="comment  relative  text-slate-400 text-xs px-2 py-0.5 rounded-lg"
                          key={index}
                          ref={showComments}
                          id={post._id}
                        >
                          <div className={post._id}>
                            <div className=" bg-slate-900 mb-1 border border-slate-800  shadow-inner px-2 rounded-md">
                              <p className=" flex items-center px-2 py-3  ">
                                {/* <img
                                  src={comment.user.profile}
                                  alt="user profile"
                                  style={{
                                    width: "50px",
                                    height: "50px",
                                    borderRadius: "50%",
                                  }}
                                  className=" shadow-lg mx-1 border border-slate-950"
                                /> */}
                                <Link
                                  to={`/profile/${comment.user.id}`}
                                  className=""
                                >
                                  <FaUser className=" text-white border border-slate-700 text-3xl p-2 rounded-full" />
                                </Link>{" "}
                                <div className="  ml-1  py-3 px-1 ">
                                  {comment.comment.slice(
                                    0,
                                    comment.comment.indexOf("#")
                                  )}
                                  {comment.comment.includes("#") && (
                                    <Link
                                      to={comment.comment.slice(
                                        Number(comment.comment.indexOf("#")) +
                                          1,
                                        comment.comment.length
                                      )}
                                      className="block mt-2 text-blue-700"
                                    >
                                      {comment.comment.slice(
                                        comment.comment.indexOf("#"),
                                        comment.comment.length
                                      )}
                                    </Link>
                                  )}
                                </div>
                              </p>
                              <span className="relative text-xs rounded-sm -left-2  -top-1 bg-slate-950 py-2 px-2">
                                From {comment.user.name}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="textarea -mt-1 px-2 py-1 w-full h-26">
                      <textarea
                        name="view"
                        id="view"
                        placeholder="comment on the post"
                        className="flex py-3 px-2 w-full rounded text-slate-400 text-sm font-medium bg-slate-950 border border-slate-900"
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>
                      <button
                        type="submit"
                        className="flex rounded items-center text-white text-xs mt-1 mb-1 bg-slate-900 py-2 px-2 font-medium shadow-md"
                      >
                        comment
                        <FaCommentAlt className="text-white mx-1 align-base" />
                      </button>
                    </div>
                  </Form>
                </div>
              ))}
            </div>
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
            </>
          )}
        </div>
      ) : (
        <div>
          <div className="redirect mt-4  flex items-center justify-between w-2/3 mx-auto">
            <Link
              to={"/login"}
              className=" bg-black p-3 rounded flex items-center text-white"
            >
              Login <FaSignInAlt className=" mx-2" />
            </Link>
            <Link
              to={"/register"}
              className=" bg-black p-3 rounded  flex items-center text-white"
            >
              Register <FaUserAlt className=" mx-2" />
            </Link>
          </div>
          <p className="text-sm mt-10 flex-wrap flex justify-center text-slate-500 mx-10">
            &copy; {new Date().getFullYear()} Lu-Intelligence. All rights
            reserved.
          </p>
        </div>
      )}
    </>
  );
};

export default Body;
