import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "../LoginPage.css";
import logo from "../assets/note-and-pencil.png";

const LoginPage = () => {
  const { login, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // navigate("/notes");
    setError("");

    try {
      await login(credentials);
      if (isAuthenticated) {
        navigate("/notes");
      } else {
        setError("Login failed. Please check email or password.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error("Error during login: ", error);
    }
  };

  return (
    <div className="login-page">
      <div className="login-form">
        <img src={logo} alt="JOT notes logo" className="logo-small" />
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            className="input-field"
            type="email"
            name="email"
            placeholder="email"
            value={credentials.email}
            onChange={handleChange}
          />
          <input
            className="input-field"
            type="password"
            name="password"
            placeholder="password"
            value={credentials.password}
            onChange={handleChange}
          />
          <button className="login-btn" type="submit">Login</button>
        </form>
        <div className="auth-links">
          <p>
            Don't have an account? <Link to="/register">Sign up here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
