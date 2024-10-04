import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
// import "../LoginPage.css";
import logo from "../assets/note-and-pencil.png";
import { Button, Form, Container, Card, Alert } from "react-bootstrap";

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
    <div className="login-page d-flex align-items-center justify-content-center">
      <Card className="login-form text-center p-4 shadow w-75 lg-w-100">
        <img
          src={logo}
          alt="JOT notes logo"
          className="logo-small mb-3 m-auto"
        />
        <h2 className="mb-4">Login</h2>
        {error && <Alert className="error">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formEmail" className="mb-4 d-flex justify-content-center">
            <Form.Control
              className="p-2 input-field"
              type="email"
              name="email"
              placeholder="Email"
              value={credentials.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formPassword" className="mb-4 d-flex justify-content-center">
            <Form.Control
              className="input-field p-2"
              type="password"
              name="password"
              placeholder="Password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button className="login-btn p-2" type="submit">
            Login
          </Button>
        </Form>
        <div className="auth-links mt-3">
          <p>
            Don't have an account? <Link to="/register">Sign up here</Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
