import { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { Eye, EyeSlash } from "react-bootstrap-icons";

const PasswordInput = ({ label, name, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Form.Group controlId={name} className="mb-4 d-flex justify-content-center">
      <InputGroup className="w-100">
        <Form.Control
          className="input-field p-2"
          type={showPassword ? "text" : "password"}
          name={name}
          placeholder={label}
          value={value}
          onChange={onChange}
          required
          style={{ borderRight: "none" }}
        />
        <InputGroup.Text
          onClick={togglePassword}
          style={{
            cursor: "pointer", background: "transparent", borderLeft: "none"
          }}
        >
          {showPassword ? <EyeSlash /> : <Eye />}
        </InputGroup.Text>
      </InputGroup>
    </Form.Group>
  );
};

export default PasswordInput;