import React from "react";
import Login from "./components/login/login";
import Protected from "./components/home/protected";
import UpdatePost from "./components/post/updatePost";
import SinglePost from "./components/post/singlePost";
import Home from "./components/home/home";
import Register from "./components/register/register";
import Post from "./components/post/post";
import { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";

import Navigation from "./components/home/Navigation";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [email, setEmail] = useState();
  return (
    <>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/product/:id" element={<SingleProduct />} />
          <Route
            path="/checkout-confirmation"
            element={<CheckoutConfirmation />}
          />  */}
          <Route path="/login" element={<Login setEmail={setEmail} />} />
          <Route path="/register" element={<Register setEmail={setEmail} />} />
          <Route element={<Protected />}>
            <Route path="/update/post/:id" element={<UpdatePost />} />
            <Route path="/post/:id" element={<SinglePost />} />
            <Route path="/createPost/user/:id" element={<Post />} />
            {/* <Route path="/update/user/:id" element={<PromoteUser />} /> */}
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
