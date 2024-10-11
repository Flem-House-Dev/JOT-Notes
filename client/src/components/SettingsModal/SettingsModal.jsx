import { useState, useEffect } from "react";
import useAccountSettingsForm from "./utils/useAccountSettingsForm";
// import { jwtDecode } from "jwt-decode";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import { ArrowLeft } from "react-bootstrap-icons";

// sub-components
import AccountSettings from "./AccountSettings";
import PasswordChange from "./PasswordChange";
import Preferences from "./Preferences";
import { getUserData } from "./utils/userUtils";

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
       
          // updateUsername={updateUsername}
          // updateEmail={updateEmail}
        />;

      case "password":
        return (
          <PasswordChange
            onCancel={() => setCurrentMenu("profile")}
          />
        );

      case "preferences":
        return (
          <Preferences/>
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
        useAccountSettingsForm.clearSettingsFormStates;
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
              useAccountSettingsForm.clearSettingsFormStates;
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
