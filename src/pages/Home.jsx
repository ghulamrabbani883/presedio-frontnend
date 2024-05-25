import axios from "axios";
import React, { useEffect, useState } from "react";
import UserPost from "../component/UserPost";
import SellerDetails from "../component/SellerDetails";
import { useSelector } from "react-redux";

const Home = () => {
  const baseurl = import.meta.env.VITE_BASE_URL;
  const [posts, setPosts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const isInterested = useSelector((state) => state.app.isInterested);
  const likes = useSelector((state) => state.app.likes);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState([]);
  const [areas, setAreas] = useState([]);

  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await axios.get(
        `${baseurl}/property/allpost?page=${page}&filter=${filter}`
      );

      if (data.success) {
        setPosts(data.posts);
        setAreas(data.areas);
        setPages(Array.from({ length: data.pages }).fill(1));
      } else {
        alert(data.msg);
      }
    };
    fetchPosts();
  }, [likes, page, filter]);
  return (
    <main className="bg-gray-light min-h-screen">
      {isInterested && <SellerDetails />}

      <section className="bg-blue w-full h-44 flex justify-center items-center">
        <h1 className="text-4xl md:text-6xl text-white">
          Welcome to <span className="text-red">Rentify</span>
        </h1>
      </section>
      <section className="flex relative">
        <aside className="w-1/5 h-screen  p-10 shadow bg-white  text-gray-dark">
          <h3 className="text-2xl font-bold mb-5">Apply Filters</h3>
          <select
            onChange={(e) => setFilter(e.target.value)}
            className="py-2 w-fit px-5 outline-none border border-gray-dark rounded"
          >
            <option value={""}>Filter By area</option>
            {areas.map((area) => (
              <option value={area?.area} key={area?._id}>
                {area?.area}
              </option>
            ))}
          </select>
        </aside>
        <div className="w-4/5  bg-gray-light max-w-7xl mx-auto py-10 md:py-16">
          <div className="flex flex-wrap justify-center items-start gap-10">
            {posts.length == 0 ? (
              <p>No Post found </p>
            ) : (
              posts.map((post) => {
                return (
                  <UserPost
                    post={post}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    key={post._id}
                  />
                );
              })
            )}
          </div>
          <div className="flex items-center justify-center gap-5 mt-10">
            {pages?.length > 1 &&
              pages.map((pag, index) => {
                return (
                  <p
                    className={`cursor-pointer rounded-md bg-gray-dark text-white flex items-center justify-center text-lg ${
                      page === index + 1 ? "w-7 h-7" : "w-5 h-5"
                    }`}
                    onClick={() => setPage(index + 1)}
                    key={index}
                  >
                    {index + 1}
                  </p>
                );
              })}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
