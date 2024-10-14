import { useRef, useState, useEffect } from "react";
import { updatePassword } from "../../../utils/userUtils";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "./accountSetInputForm.css";

const PasswordChange = ({}) => {
  const currentPasswordRef = useRef(null);
  const newPasswordRef = useRef(null);
  const confirmNewPasswordRef = useRef(null);

  // const [error, setError] = useState("");
  // const [success, setSuccess] = useState("");

  const [alertMessage, setAlertMessage] = useState({ type: "", message: "" });
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (alertMessage) {
      const fadeTimer = setTimeout(() => {
        setFadeOut(true);
      }, 3000);

      const removeTImer = setTimeout(() => {
        setAlertMessage({ type: "", message: "" });
        setFadeOut(false);
      }, 4000);

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(removeTImer);
      };
    }
  }, [alertMessage]);

  const handlePasswordChange = async () => {
    const currentPassword = currentPasswordRef.current.value;
    const newPassword = newPasswordRef.current.value;
    const confirmNewPassword = confirmNewPasswordRef.current.value;

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      // setError("Please fill out all fields");
      setAlertMessage({
        type: "danger",
        message: "Please fill out all fields",
      });
      return;
    }

    if (newPassword !== confirmNewPassword) {
      // setError("Passwords do not match");
      setAlertMessage({ type: "danger", message: "Passwords do not match" });
      return;
    }

    try {
      await updatePassword(currentPassword, newPassword);

      // setSuccess("Password changed successfully");
      // setError("");
      setAlertMessage({
        type: "success",
        message: "Password changed successfully",
      });
    } catch (error) {
      console.error("Error changing password: ", error);
      // setError("Failed to change password");
      setAlertMessage({ type: "danger", message: "Failed to change password" });
    }

    clearForm();
  };

  const clearForm = () => {
    currentPasswordRef.current.value = "";
    newPasswordRef.current.value = "";
    confirmNewPasswordRef.current.value = "";
  };

  const onCancel = () => {
    clearForm();
    setError("");
    setSuccess("");
  };

  return (
    <>
      {/* Password Change Form (Toggleable) */}
      <h5>Change Password</h5>
      <div className="mt-3">
        <Form.Group>
          <Form.Label>Current Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Current Password"
            ref={currentPasswordRef}
          />
        </Form.Group>

        <Form.Group className="mt-2">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter New Password"
            ref={newPasswordRef}
          />
        </Form.Group>

        <Form.Group className="mt-2">
          <Form.Label>Confirm New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            ref={confirmNewPasswordRef}
          />
        </Form.Group>
        <div className="mt-2" style={{ height: "24px" }}>
          {/* {error && <p className="text-danger">{error}</p>}
        {success && <p className="text-success">{success}</p>} */}
          {alertMessage.message && (
            <p
              className={`update-alert ${fadeOut ? "fade-out" : ""}`}
              style={{
                color:
                  alertMessage.type === "success"
                    ? "green"
                    : alertMessage.type === "danger"
                    ? "red"
                    : "black",
              }}
            >
              {alertMessage.message}
            </p>
          )}
        </div>

        <div className="d-flex">
          <Button
            variant="outline-secondary"
            onClick={onCancel}
            style={{ width: "160px" }}
            className="mt-4 me-4"
          >
            Cancel
          </Button>

          <Button
            variant="secondary"
            className="mt-4"
            style={{ width: "160px" }}
            onClick={handlePasswordChange}
          >
            Update Password
          </Button>
        </div>
      </div>
    </>
  );
};

export default PasswordChange;
