import axios from "axios";
import React, { useState } from "react";

const NewPost = () => {
  const [postData, setPostData] = useState({
    place: "",
    area: "",
    bedroom: "",
    bathroom: "",
    nearby:"",
  });
  const baseurl = import.meta.env.VITE_BASE_URL;

  const handleChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.post(
      `${baseurl}/property/seller/create`,
      postData,
      {
        headers: {
          token: JSON.parse(localStorage.getItem("token")),
        },
      }
    );
    if (data.success) {
      alert("new Property Added");
      
    } else {
      alert(data.msg);
    }
    setPostData({
        place: "",
        area: "",
        bedroom: "",
        bathroom: "",
        nearby:"",
      })
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-light">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Create New Property</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="place"
              className="block text-sm font-medium text-gray-dark"
            >
              Place
            </label>
            <input
              type="text"
              id="place"
              name="place"
              value={postData.place}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-dark rounded-md shadow-sm outline-none sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="area"
              className="block text-sm font-medium text-gray-dark"
            >
              Area
            </label>
            <input
              type="text"
              id="area"
              name="area"
              value={postData.area}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-dark rounded-md shadow-sm outline-none sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="bedroom"
              className="block text-sm font-medium text-gray-dark"
            >
              Bedrooms
            </label>
            <input
              type="number"
              id="bedroom"
              name="bedroom"
              value={postData.bedroom}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-dark rounded-md shadow-sm outline-none sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="bathroom"
              className="block text-sm font-medium text-gray-dark"
            >
              Bathroom
            </label>
            <input
              type="number"
              id="bathroom"
              name="bathroom"
              value={postData.bathroom}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-dark rounded-md shadow-sm outline-none sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="nearby"
              className="block text-sm font-medium text-gray-dark"
            >
              Nearby
            </label>
            <input
              type="text"
              id="nearby"
              name="nearby"
              value={postData.nearby}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-dark rounded-md shadow-sm outline-none sm:text-sm"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue text-white py-2 px-4 rounded outline-none f"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewPost;
