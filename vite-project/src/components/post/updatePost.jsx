import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetPostByIdQuery, useUpdatePostMutation } from "../home/homeSlice";
import React from "react";
import "./post.css";

export default function UpdatePost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: post } = useGetPostByIdQuery(id);

  useEffect(() => {
    console.log("Product ID:", id);
  }, [id]);

  const [updatePost] = useUpdatePostMutation();

  const [form, setForm] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    if (post) {
      setForm({
        title: post.title || "",
        content: post.title || "",
      });
    }
  }, [post]);

  const update = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePost = async (event) => {
    event.preventDefault();
    try {
      const response = await updatePost({ id, form });
      if (response) {
        alert("Post updated!");
        navigate("/");
      }
    } catch (error) {
      console.log("Update Post error");
      alert("Failed to update post.");
    }
  };

  return (
    <div>
      <h1>Update Post: {post ? `${post.title}` : "Loading..."}</h1>
      <form onSubmit={handlePost} className="post-form">
        <label>*Title</label>
        <input
          name="title"
          value={form.title}
          onChange={update}
          type="text"
          className="input-post"
          placeholder="Title"
          required
        />
        <label>Content</label>
        <input
          name="content"
          value={form.content}
          onChange={update}
          type="text"
          className="input-post"
          placeholder="Content"
        />

        <button type="submit" className="button-confirm">
          Update Post
        </button>
      </form>
    </div>
  );
}
