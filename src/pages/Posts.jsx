import React, { useEffect, useState } from "react";
import SellerPost from "../component/SellerPost";
import axios from "axios";
import { Link } from "react-router-dom";

const Posts = () => {
  const baseurl = import.meta.env.VITE_BASE_URL;
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await axios.get(`${baseurl}/property/allpost`);
      if (data.success) {
        setPosts(data.posts);
      } else {
        alert(data.msg);
      }
    };
    fetchPosts();
  }, []);
  return (
    <main className="bg-gray-light">
      <section className="bg-blue w-full h-44 flex justify-center items-center">
        <h1 className="text-4xl md:text-6xl text-white">
          Welcome <span className="text-red">Seller Name</span>
        </h1>
      </section>

      <section className="w-full bg-gray-light max-w-7xl mx-auto flex flex-wrap justify-center items-start gap-10 py-10 md:py-16">
        {posts.length == 0 ? (
          <Link to="/seller/create">Create new post</Link>
        ) : (
          posts.map((post) => {
            return <SellerPost post={post} key={post._id} />;
          })
        )}
      </section>
    </main>
  );
};

export default Posts;
