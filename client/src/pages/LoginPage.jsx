import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import logo from "../assets/note-and-pencil.png";
import { Button, Form, Card, Alert, InputGroup } from "react-bootstrap";
import PasswordInput from "../components/PasswordInput/PasswordInput";

const LoginPage = () => {
  const { login, isAuthenticated } = useContext(AuthContext);
  const [error, setError] = useState("");

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

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
        {error && (
          <Alert className="error" variant="secondary">
            {error}
          </Alert>
        )}
        <Form onSubmit={handleSubmit}>
          {/* Email input group */}
          <Form.Group
            controlId="formEmail"
            className="mb-4 d-flex justify-content-center"
          >
            <InputGroup className="w-100">
              <Form.Control
                className="p-2 input-field"
                type="email"
                name="email"
                placeholder="Email"
                value={credentials.email}
                onChange={handleChange}
                required
              />
            </InputGroup>
          </Form.Group>

          {/* Password input group */}
          <PasswordInput
            label="Password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
          />
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
