import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreatePostMutation } from "../home/homeSlice";
import { useSelector } from "react-redux";
import "./post.css";

import React from "react";

export default function Post() {
  const [createPost] = useCreatePostMutation();
  const navigate = useNavigate();

  const state = useSelector((state) => state);
  const usersId = window.sessionStorage.getItem("User");

  const [form, setForm] = useState({
    title: "",
    content: "",
  });

  const [message, setMessage] = useState("");

  const update = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      if (!form.title || !form.content) {
        setMessage("Please fill in all required fields.");
        return;
      }

      let response = false;

      response = await createPost({
        usersId,
        title: form.title,
        content: form.content,
      }).unwrap();
      console.log(response);

      if (response) {
        setMessage("Post successful!");
        navigate("/");
      }
    } catch (error) {
      setMessage("Post failed. Please try again.");
    }
  };

  return (
    <div className="page-container">
      <div className="post">
        <h2>Create a Post</h2>
        <form onSubmit={submit} className="post-form">
          <label htmlFor="title">*Title:</label>
          <input
            id="title"
            name="title"
            value={form.title}
            onChange={update}
            type="text"
            placeholder="Title"
            required
            className="input-post"
          />
          <label htmlFor="content">*Content:</label>
          <input
            id="content"
            name="content"
            value={form.content}
            onChange={update}
            type="text"
            placeholder="What's on your mind?"
            required
            className="input-post"
          />
          {message && <p>{message}</p>}
          <button type="submit" className="button-confirm">
            Post
          </button>
        </form>
      </div>
    </div>
  );
}
