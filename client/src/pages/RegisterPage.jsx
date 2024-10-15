import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import logo from "../assets/note-and-pencil.png";
import { Form, Button, Container, Card, InputGroup } from "react-bootstrap";
import PasswordInput from "../components/PasswordInput";

const RegisterPage = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(formData);
    navigate("/notes");
  };

  return (
    <div className="register-page d-flex align-items-center justify-content-center">
      <Card className="register-form text-center p-4 shadow">
        <img
          src={logo}
          alt="JOT notes logo"
          className="logo-small mb-3 m-auto"
        />
        <h2 className="mb-4">Register</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group
            controlId="username"
            className="mb-4 d-flex justify-content-center"
          >
            <InputGroup className="w-100">
            <Form.Control
              className="input-field p-2"
              type="text"
              name="username"
              placeholder="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            </InputGroup>
          </Form.Group>
          <Form.Group
            controlId="email"
            className="mb-4 d-flex justify-content-center"
          >
            <InputGroup className="w-100">
              <Form.Control
                className="input-field p-2"
                type="email"
                name="email"
                placeholder="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </InputGroup>
          </Form.Group>

          {/* Password Input */}
          <PasswordInput
            label="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />

          <Button className="register-btn p-2" type="submit">
            Register
          </Button>
        </Form>
        <div className="auth-links mt-3">
          <p>
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default RegisterPage;
