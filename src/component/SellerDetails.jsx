// src/components/SellerDetails.jsx
import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { interested } from "../app/features/appSlice";

const SellerDetails = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const baseurl = import.meta.env.VITE_BASE_URL;
  const [post, setPost] = useState({});
  const postId = useSelector((state) => state.app.postId);
  const user = useSelector((state) => state.app.user);

  const toggleSidebar = () => {
    dispatch(interested(false));
  };
  useEffect(() => {
    const fetchSeller = async () => {
      setLoading(true);
      const { data } = await axios.get(
        `${baseurl}/property/posts/details/${postId}`,{
          headers:{
            userId:user?._id,
          }
        }
      );
      console.log(data)
      if (data.success) {
        setPost(data.post);
        setLoading(false);
      } else {
        alert(data.msg);
        setLoading(false);
      }
    };
    fetchSeller();
  }, [postId]);

  return (
    <aside
      className={`w-2/3 shadow-md md:w-1/2 h-screen bg-white absolute top-0 right-0 z-50 p-10 flex flex-col gap-10`}
    >
      <RxCross2
        className="text-gray-dark cursor-pointer hover:scale-110 relative top-5 left-5"
        size={32}
        onClick={toggleSidebar}
      />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2 className="text-center text-3xl">Property Details</h2>
          <article className="flex flex-col gap-3">
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
          </article>

          
        </>
      )}
    </aside>
  );
};

export default SellerDetails;
