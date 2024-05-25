import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [registerData, setRegisterData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    role: "",
    password: "",
  });
  const baseurl = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();

  const handleChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.post(`${baseurl}/user/register`, registerData);
    console.log(data);
    if (data.success) {
      localStorage.setItem("token", JSON.stringify(data.token));
      alert("User created");
      navigate("/login", { replace: true });
      window.location.reload();

    } else {
      alert(data.msg);
    }
    setRegisterData({
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      role: "",
      password: "",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-light">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="firstname"
              className="block text-sm font-medium text-gray-dark"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={registerData.firstname}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-dark rounded-md shadow-sm outline-none sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="lastname"
              className="block text-sm font-medium text-gray-dark"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={registerData.lastname}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-dark rounded-md shadow-sm outline-none sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-dark"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={registerData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-dark rounded-md shadow-sm outline-none sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-dark"
            >
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={registerData.phone}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-dark rounded-md shadow-sm outline-none sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-dark"
            >
              Role
            </label>
            <select
              className="mt-1 block w-full px-3 py-2 border border-gray-dark rounded-md shadow-sm outline-none sm:text-sm"
              id="role"
              name="role"
              value={registerData.role}
              onChange={handleChange}
            >
              <option value="">Select role</option>
              <option value={"buyer"}>Buyer</option>
              <option value={"seller"}>Seller</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-dark"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={registerData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-dark rounded-md shadow-sm outline-none sm:text-sm"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue text-white py-2 px-4 rounded outline-none f"
          >
            Register
          </button>
        </form>
        <p className="text-gray text-center mt-3">Already registered :<Link className="text-blue" to="/login">Login</Link></p>

      </div>
    </div>
  );
};

export default Register;
