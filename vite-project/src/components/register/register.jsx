import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../register/registerSlice";
import { useSelector } from "react-redux";
import "../home/style.css";

import React from "react";

export default function Register({ setEmail }) {
  const [registerUser] = useRegisterMutation();
  const navigate = useNavigate();

  const state = useSelector((state) => state);

  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
    name: "",
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
      if (!form.name || !form.password || !form.email || !form.password) {
        setMessage("Please fill in all required fields.");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email)) {
        setMessage("Please enter a valid email address.");
        return;
      }

      if (form.password.length < 8) {
        setMessage("Password needs to be at least 8 characters.");
        return;
      }

      let response = false;

      response = await registerUser(form).unwrap();
      console.log(response);
      //   const responseJson = JSON.parse(response);

      if (response) {
        setMessage("Registration successful!");
        navigate("/");
      }
    } catch (error) {
      setMessage("Registration failed. Please try again.");
    }
  };

  return (
    <form onSubmit={submit} className="form">
      <p className="form-title">Register</p>
      <div className="input-container">
        <input
          name="email"
          value={form.email}
          type="email"
          placeholder="Enter email"
          onChange={update}
          required
        />
        <span></span>
      </div>
      <div className="input-container">
        <input
          name="username"
          value={form.username}
          onChange={update}
          type="text"
          placeholder="Username"
          required
        />
        <span></span>
      </div>
      <div className="input-container">
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={update}
          placeholder="Password"
          required
        />
        <span></span>
      </div>
      <div className="input-container">
        <input
          name="name"
          value={form.name}
          onChange={update}
          type="text"
          placeholder="Name"
          required
        />
      </div>
      <button type="submit" className="submit">
        Sign in
      </button>

      <p className="signup-link">{message && <p>{message}</p>}</p>
    </form>
  );
}
