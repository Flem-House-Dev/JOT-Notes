import { useState, useRef, useEffect } from "react";
import { useAccountSettingsForm } from "./useAccountSettingsForm";
import { jwtDecode } from "jwt-decode";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import { ArrowLeft } from "react-bootstrap-icons";

// sub-components
import AccountSettings from "./AccountSettings";
import { getUserData, updateUsername, updateEmail } from "./userUtils";


const SettingsModal = ({ showModal, handleCloseModal }) => {
  const [currentMenu, setCurrentMenu] = useState("main");

  // const [username, setUsername] = useState("currentUsername");
  // const [email, setEmail] = useState("currentEmail");
  const [userData, setUserData] = useState({ username: "", email: "" });

  // get user data from token
  useEffect(() => {
    if (showModal) {
      const data = getUserData();
      setUserData(data);
    }
  }, [showModal]);

  



  const renderMenu = () => {
    switch (currentMenu) {
      case "profile":
        return <AccountSettings
          userData={userData}
          setUserData={setUserData}
          onPasswordChange={() => setCurrentMenu("password")}
          updateUsername={updateUsername}
          updateEmail={updateEmail}
        />;

      case "password":
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
                />
              </Form.Group>
              <Form.Group className="mt-2">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter New Password"
                />
              </Form.Group>
              <Form.Group className="mt-2">
                <Form.Label>Confirm New Password</Form.Label>
                <Form.Control type="password" placeholder="Confirm Password" />
              </Form.Group>
              <div className="d-flex">
                <Button
                  variant="outline-secondary"
                  onClick={() => setCurrentMenu("profile")}
                  style={{ width: "160px" }}
                  className="mt-4 me-4"
                >
                  Cancel
                </Button>
                <Button
                  variant="secondary"
                  className="mt-4"
                  style={{ width: "160px" }}
                >
                  Update Password
                </Button>
              </div>
            </div>
          </>
        );

      case "preferences":
        return (
          <div>
            <h5>Preferences</h5>

            <Form className="mt-3">
              <Form.Group>
                <Form.Check
                  type="switch"
                  id="dark-mode-switch"
                  label="Enable Dark Mode"
                />
              </Form.Group>
              <Form.Group>
                <Form.Check
                  type="switch"
                  id="notifications-switch"
                  label="Enable Notifications"
                />
              </Form.Group>
            </Form>
          </div>
        );

      default:
        // main list of settings
        return (
          <ListGroup>
            <ListGroup.Item action onClick={() => setCurrentMenu("profile")}>
              Account Settings
            </ListGroup.Item>
            <ListGroup.Item
              action
              onClick={() => setCurrentMenu("preferences")}
            >
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
          <Button
            variant="secondary"
            onClick={() => {
              handleCloseModal();
              setCurrentMenu("main");
            }}
          >
            Close
          </Button>
        ) : (
          <Button
            variant="Link"
            onClick={() => {
              setCurrentMenu("main");
              clearSettingsFormStates();
            }}
          >
            <ArrowLeft className="mb-1" height={16} width={16} /> Back
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default SettingsModal;
