import axios from "axios";
import React, { useState } from "react";
import { Link,  useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const baseurl = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle login logic here
    const { data } = await axios.post(`${baseurl}/user/login`, {
      email,
      password,
    });
    console.log(data);
    if (data.success) {
      localStorage.setItem("token", JSON.stringify(data.token));
      alert("Login Succesful");
      navigate("/", { replace: true });
      window.location.reload();
    } else {
      alert(data.msg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-light">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-dark rounded-md shadow-sm outline-none sm:text-sm"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-dark"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-dark rounded-md shadow-sm outline-none sm:text-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue text-white py-2 px-4 rounded"
          >
            Login
          </button>
        </form>
        <p className="text-gray text-center mt-3">
          New to Rentify :
          <Link className="text-blue" to="/register">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
