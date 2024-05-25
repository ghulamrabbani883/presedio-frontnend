import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

const SellerPost = ({ post }) => {
  // console.log(post?._id)
  const baseurl = import.meta.env.VITE_BASE_URL;

  const handleDelete = async (id) => {
    const { data } = await axios.delete(
      `${baseurl}/property/seller/posts/${id}`,
      { headers: { token: JSON.parse(localStorage.getItem("token")) } }
    );
    if (data.success) {
      alert("Post Deleted");
      window.location.reload();
    } else {
      alert(data.msg);
    }
  };

  return (
    <article className="w-80 h-fit p-10 rounded-lg shadow-md bg-white flex flex-col gap-3">
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
      <div className="flex flex-col gap-3">
        <Link
          to={`/seller/post/update/${post?._id}`}
          className="bg-blue hover:bg-blue-light w-full rounded py-2 text-center text-lg text-white transition-all duration-100"
        >
          Update
        </Link>
        <button
          onClick={() => handleDelete(post?._id)}
          className="bg-red hover:bg-blue-light w-full rounded py-2 text-center text-lg text-white transition-all duration-100"
        >
          Delete
        </button>
      </div>
    </article>
  );
};

export default SellerPost;
