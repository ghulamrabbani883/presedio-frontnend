import React, { Suspense, useEffect, useLayoutEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Error404 from "./pages/Error404";
import Navbar from "./component/Navbar";
import NewPost from "./pages/NewPost";
import Footer from "./component/Footer";
import Posts from "./pages/Posts";
import ProtectedRoute from "./component/ProtectedRoute";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loggedIn, setUser } from "./app/features/appSlice";
import Update from "./pages/Update";

const App = () => {
  const baseurl = import.meta.env.VITE_BASE_URL;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.app.user);
  const isLoggedIn = useSelector((state) => state.app.isLoggedIn);

  useLayoutEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get(`${baseurl}/user/me`, {
        headers: {
          token: JSON.parse(localStorage.getItem("token")),
          "Content-Type": "application/json",
        },
      });
      if (data.success) {
        dispatch(setUser(data.user));
        dispatch(loggedIn());
      } else {
        localStorage.removeItem("token");
        dispatch(loggedIn());
      }
    };
    fetchUser();
  }, []);

  return (
    <>
      <Navbar />
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<Error404 />} />

          {/* Protected Route for Seller */}
          <Route
            path="/seller/post"
            element={
              <ProtectedRoute user={user} login={isLoggedIn}>
                <NewPost />
              </ProtectedRoute>
            }
          />
          <Route
            path="/seller/allpost"
            element={
              <ProtectedRoute user={user} login={isLoggedIn}>
                <Posts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/seller/post/update/:id"
            element={
              <ProtectedRoute user={user} login={isLoggedIn}>
                <Update />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
};

export default App;
