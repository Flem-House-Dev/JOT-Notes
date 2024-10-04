import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
// import "../LoginPage.css";
import logo from "../assets/note-and-pencil.png";
import { Form, Button, Container, Card } from "react-bootstrap";

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
    // <div className="register-page">
    //   <div className="register-form">
    //   <img src={logo} alt="JOT notes logo" className="logo-small" />
    //     <h2>Register</h2>
    //     <form onSubmit={handleSubmit}>
    //       <input
    //         className="input-field"
    //         type="text"
    //         name="username"
    //         placeholder="username"
    //         value={formData.username}
    //         onChange={handleChange}
    //       />
    //       <input
    //         className="input-field"
    //         type="email"
    //         name="email"
    //         placeholder="email"
    //         value={formData.email}
    //         onChange={handleChange}
    //       />
    //       <input
    //         className="input-field"
    //         type="password"
    //         name="password"
    //         placeholder="Password"
    //         value={formData.password}
    //         onChange={handleChange}
    //       />
    //       <button className="register-btn" type="submit">Register</button>
    //     </form>
    //     <div className="auth-links">
    //       <p>Already have an account? <Link to="/login">Login here</Link></p>
    //     </div>
    //   </div>

    // </div>

    <div className="register-page d-flex align-items-center justify-content-center">
      <Card className="register-form text-center p-4 shadow">
        <img
          src={logo}
          alt="JOT notes logo"
          className="logo-small mb-3 m-auto"
        />
        <h2 className="mb-4">Register</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="username" className="mb-4 d-flex justify-content-center">
            <Form.Control
             className="input-field p-2"
              type="text"
              name="username"
              placeholder="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="email" className="mb-4 d-flex justify-content-center">
            <Form.Control
             className="input-field p-2"
              type="email"
              name="email"
              placeholder="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="password" className="mb-4 d-flex justify-content-center">
            <Form.Control
             className="input-field p-2"
              type="password"
              name="password"
              placeholder="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>
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
