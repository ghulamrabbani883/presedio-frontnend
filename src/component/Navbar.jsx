import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.app.isLoggedIn);
  const user = useSelector((state) => state.app.user);

  const navigate = useNavigate();
console.log(isLoggedIn)
  const handleLogout = (e) => {
    localStorage.removeItem("token");
    alert("Logged out");
    window.location.reload();
    navigate("/");
  };
  return (
    <nav className="bg-gray-dark shadow">
      <div className="container mx-auto px-4 py-3 lg:px-24 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-red">
          Rentify
        </Link>
        <div className="space-x-4">
          <Link
            to="/"
            className="text-gray-light hover:text-blue transition-all duration-100"
          >
            Home
          </Link>
          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                className="text-gray-light hover:text-blue transition-all duration-100"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-gray-light hover:text-blue transition-all duration-100"
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="text-gray-light hover:text-blue transition-all duration-100"
            >
              Logout
            </button>
          )}
          {isLoggedIn && user?.role === 'seller' && (
            <>
              <Link
                to="/seller/post"
                className="text-gray-light hover:text-blue transition-all duration-100"
              >
                New Post
              </Link>
              <Link
                to="/seller/allpost"
                className="text-gray-light hover:text-blue transition-all duration-100"
              >
                All Post
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
