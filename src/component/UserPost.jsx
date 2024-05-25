import React from "react";
import {
  AiFillLike,
  AiOutlineLike,
  AiFillDislike,
  AiOutlineDislike,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { interested, setLikes, setPostId } from "../app/features/appSlice";
import axios from "axios";

const UserPost = ({ post }) => {
  const baseurl = import.meta.env.VITE_BASE_URL;
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.app.isLoggedIn);
  const user = useSelector((state) => state.app.user);

  const handleClick = (id) => {
    dispatch(setPostId(id));
    dispatch(interested(true));
  };
  const handleDisLike = async (postId) => {
    const { data } = await axios.put(
      `${baseurl}/property/buyer/posts/unlike/${postId}`,
      {},
      {
        headers: {
          token: JSON.parse(localStorage.getItem("token")),
        },
      }
    );
    console.log(data)
    if (data.success) {
      dispatch(setLikes(data.likes));
    } else {
      alert(data.msg);
    }
  };
  const handleLike = async (postId) => {
    const { data } = await axios.put(
      `${baseurl}/property/buyer/posts/like/${postId}`,
      {},
      {
        headers: {
          token: JSON.parse(localStorage.getItem("token")),
        },
      }
    );

    if (data.success) {
      dispatch(setLikes(data.likes));
    } else {
      alert(data.msg);
    }
  };

  return (
    <article className="w-80 h-fit p-8 rounded-lg shadow-md bg-white flex flex-col gap-3">
      <p className="text-lg text-gray-dark">
        <span className="font-semibold">Place:</span> {post?.place}
      </p>
      <p className="text-lg text-gray-dark">
        <span className="font-semibold">Area:</span> {post?.area}
      </p>
      <p className="text-lg text-gray-dark">
        <span className="font-semibold">Bedrooms:</span> {post?.bedroom}
      </p>
      <p className="text-lg text-gray-dark">
        <span className="font-semibold">Bathroom:</span> {post?.bathroom}
      </p>
      <p className="text-lg text-gray-dark">
        <span className="font-semibold">Nearby:</span> {post?.nearby}
      </p>
      {isLoggedIn ? (
        <button
          onClick={() => handleClick(post?._id)}
          className="bg-blue hover:bg-blue-light w-full rounded py-2 text-center text-lg text-white transition-all duration-100"
        >
          Interested
        </button>
      ) : (
        <Link
          to="/login"
          className="bg-blue hover:bg-blue-light w-full rounded py-2 text-center text-lg text-white transition-all duration-100"
        >
          Interested
        </Link>
      )}
      <div className="flex justify-between items-center mt-3">
        {post?.likes?.includes(String(user._id)) ? (
          <AiFillDislike
            className="text-red cursor-pointer"
            size={24}
            onClick={() => handleDisLike(post?._id)}
          />
        ) : (
          <AiOutlineLike
            className="text-red cursor-pointer"
            size={24}
            onClick={() => handleLike(post?._id)}
          />
        )}

        <p className="text-gray-dark text-md">{post?.likes?.length} Likes</p>
      </div>
    </article>
  );
};

export default UserPost;
