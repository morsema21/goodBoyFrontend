import { useState } from "react";
import { useLoginMutation } from "../login/loginSlice";
import { useNavigate } from "react-router-dom";
import React from "react";
import "../home/style.css";

const Login = ({ setEmail }) => {
  const [inputFields, setInputFields] = useState({
    email: "",
    password: "",
  });
  const [login] = useLoginMutation();
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setInputFields((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    try {
      if (!inputFields.email || !inputFields.password) {
        setMessage("Please fill in all required fields.");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(inputFields.email)) {
        setMessage("Please enter a valid email address.");
        return;
      }

      let success = await login(inputFields).unwrap();
      const successJson = JSON.parse(success);

      if (success) {
        setEmail(successJson.token.email);
        setMessage("Login successful!");
        navigate(`/`);
      }
    } catch (error) {
      setMessage("Login failed. Please check your credentials.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <p className="form-title">Sign in to your account</p>
      <div className="input-container">
        <input
          name="email"
          type="email"
          placeholder="Enter email"
          onChange={handleChange}
          required
        />
        <span></span>
      </div>
      <div className="input-container">
        <input
          name="password"
          type="password"
          placeholder="Enter password"
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="submit">
        Sign in
      </button>

      <p className="signup-link">
        No account?
        <a href="/register">Sign up</a>
        {message && <p>{message}</p>}
      </p>
    </form>
  );
};

export default Login;
