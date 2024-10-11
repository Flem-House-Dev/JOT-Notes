// SettingsModal.jsx
import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { ArrowLeft } from "react-bootstrap-icons";

import AccountSettings from "./AccountSettings";
import PasswordChange from "./PasswordChange";
import Preferences from "./Preferences";
import { getUserData, updateUsername, updateEmail } from "./utils/userUtils";

const SettingsModal = ({ showModal, handleCloseModal }) => {
  const [currentMenu, setCurrentMenu] = useState("main");
  const [userData, setUserData] = useState({ username: "", email: "" });

  useEffect(() => {
    if (showModal) {
      const data = getUserData();
      setUserData(data);
    }
  }, [showModal]);

  const clearSettingsFormStates = () => {
    // Reset any necessary state here
  };

  const renderMenu = () => {
    switch (currentMenu) {
      case "profile":
        return (
          <AccountSettings 
            userData={userData} 
            setUserData={setUserData} 
            onPasswordChange={() => setCurrentMenu("password")}
            updateUsername={updateUsername}
            updateEmail={updateEmail}
          />
        );
      case "password":
        return <PasswordChange onCancel={() => setCurrentMenu("profile")} />;
      case "preferences":
        return <Preferences />;
      default:
        return (
          <ListGroup>
            <ListGroup.Item action onClick={() => setCurrentMenu("profile")}>
              Account Settings
            </ListGroup.Item>
            <ListGroup.Item action onClick={() => setCurrentMenu("preferences")}>
              Preferences
            </ListGroup.Item>
          </ListGroup>
        );
    }
  };

  return (
    <Modal
      show={showModal}
      onHide={() => {
        handleCloseModal();
        setCurrentMenu("main");
        clearSettingsFormStates();
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Settings</Modal.Title>
      </Modal.Header>
      <Modal.Body>{renderMenu()}</Modal.Body>
      <Modal.Footer>
        {currentMenu === "main" ? (
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        ) : (
          <Button variant="link" onClick={() => setCurrentMenu("main")}>
            <ArrowLeft className="mb-1" height={16} width={16} /> Back
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

// export default SettingsModal;
// ------------------------------------------------------------

// AccountSettings.jsx
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

const AccountSettings = ({ userData, setUserData, onPasswordChange, updateUsername, updateEmail }) => {
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [updateAlert, setUpdateAlert] = useState(null);

  const handleUsernameUpdate = async () => {
    try {
      await updateUsername(userData.username);
      setUpdateAlert("Username updated successfully");
      setIsEditingUsername(false);
    } catch (error) {
      setUpdateAlert("Error updating username");
    }
  };

  const handleEmailUpdate = async () => {
    try {
      await updateEmail(userData.email);
      setUpdateAlert("Email updated successfully");
      setIsEditingEmail(false);
    } catch (error) {
      setUpdateAlert("Error updating email");
    }
  };

  // Render form fields, buttons, and alerts here
  // ...

};

// export default AccountSettings;
// ------------------------------------------------------------

// PasswordChange.jsx
import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const PasswordChange = ({ onCancel }) => {
  // Render password change form here
  // ...
};

// export default PasswordChange;
// ------------------------------------------------------------

// Preferences.jsx
import React from "react";
import Form from "react-bootstrap/Form";

const Preferences = () => {
  // Render preferences form here
  // ...
};

// export default Preferences;
// ------------------------------------------------------------

// userUtils.js
import { jwtDecode } from "jwt-decode";

export const getUserData = () => {
  const token = localStorage.getItem("userToken");
  if (token) {
    const decodedToken = jwtDecode(token);
    return {
      username: decodedToken.username,
      email: decodedToken.email,
    };
  }
  return { username: "", email: "" };
};

export const updateUsername = async (newUsername) => {
  // Implementation of username update
  // ...
};

export const updateEmail = async (newEmail) => {
  // Implementation of email update
  // ...
};