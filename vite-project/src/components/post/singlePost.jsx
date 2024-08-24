import React from "react";
import { useGetPostByIdQuery } from "../home/homeSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useDeletePostMutation } from "../home/homeSlice";
import "./post.css";

const SinglePost = () => {
  const { id } = useParams();
  const { data: singlePost, isSuccess, isLoading } = useGetPostByIdQuery(id);
  const [deletePost] = useDeletePostMutation();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="loading">
        <h2>Loading...</h2>
      </div>
    );
  }

  if (!isSuccess || !singlePost) {
    return <div>Post not found</div>;
  }

  const handleDeletePost = async (event, id) => {
    event.preventDefault();
    try {
      const response = await deletePost({ id });
      alert("Post deleted!");
      navigate("/");
    } catch (error) {
      alert("Failed to delete post");
    }
  };

  return (
    <div className="post-update">
      <h1>{singlePost.title}</h1>
      <p className="post-body">{singlePost.content}</p>
      <p className="post-time">{singlePost.createdAt}</p>
      <p className="post-time">{singlePost.updatedAt}</p>

      <div className="button-container">
        <button
          className="button-post"
          type="button"
          onClick={() => navigate(`/update/post/${id}`)}
        >
          Update Post
        </button>
        <button
          onClick={(event) => handleDeletePost(event, id)}
          className="button-post"
        >
          Delete Post
        </button>
        <button
          className="button-post"
          type="button"
          onClick={() => navigate("/")}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default SinglePost;
