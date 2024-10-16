import { useRef, useState, useEffect } from "react";
import { updatePassword } from "../../../utils/userUtils";

import { Form, Button } from "react-bootstrap";
import PasswordInput from "../../PasswordInput/PasswordInput";

import "./accountSetInputForm.css";

const PasswordChange = ({}) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

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
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setAlertMessage({
        type: "danger",
        message: "Please fill out all fields",
      });
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setAlertMessage({ type: "danger", message: "Passwords do not match" });
      return;
    }

    try {
      await updatePassword(currentPassword, newPassword);

      setAlertMessage({
        type: "success",
        message: "Password changed successfully",
      });
    } catch (error) {
      console.error("Error changing password: ", error);
      setAlertMessage({ type: "danger", message: "Failed to change password" });
    }

    clearForm();
  };

  const clearForm = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
  };

  const onCancel = () => {
    clearForm();
    setAlertMessage({ type: "", message: "" });
  };

  return (
    <>
      {/* Password Change Form (Toggleable) */}
      <h5>Change Password</h5>
      <div className="mt-3">

        <PasswordInput
          label="Current Password"
          name="currentPassword"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />

        <PasswordInput
          label="New Password"
          name="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <PasswordInput
          label="Confirm New Password"
          name="confirmNewPassword"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
        />

        <div className="mt-2" style={{ height: "24px" }}>
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
