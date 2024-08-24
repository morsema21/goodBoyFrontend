import React from "react";
import { useGetPostsQuery } from "./homeSlice";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";

export default function Home() {
  const { data: posts = [], isSuccess, isLoading, error } = useGetPostsQuery();

  if (isLoading) {
    return (
      <div className="loading">
        <h2>Loading...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <h2>Failed to load products.</h2>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="product-list">
      {isSuccess &&
        posts.map((post) => (
          <div className="product-card" key={post.id}>
            <Link to={`/post/${post.id}`} className="product-link">
              <h2 className="product-name">{post.title}</h2>
              <p className="product-price">{post.content}</p>
            </Link>
          </div>
        ))}
    </div>
  );
}
