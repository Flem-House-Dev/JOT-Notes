import { useState } from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { ArrowLeft } from "react-bootstrap-icons";

import AccountSettings from "./AccountSettings";
import PasswordChange from "./AccountSettingsComponents/PasswordChange";
import Preferences from "./Preferences";
import { getUserData } from "../../utils/userUtils";

// import useAccountSettingsForm from "../../hooks/useAccountSettingsForm";

const SettingsModal = ({ showModal, handleCloseModal }) => {
  const [currentMenu, setCurrentMenu] = useState("main");
  const [userData, setUserData] = useState({ username: "", email: "" });

  const handleProfileClick = () => {
    setCurrentMenu("profile");
    const data = getUserData();
    setUserData(data);
  };

  const renderMenu = () => {
    switch (currentMenu) {
      case "profile":
        return <AccountSettings
          userData={userData}
          setUserData={setUserData}
          onPasswordChange={() => setCurrentMenu("password")}
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
            <ListGroup.Item action onClick={handleProfileClick}>
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
            onClick={handleCloseModal}
          >
            Close
          </Button>
        ) : (
          <Button
            variant="Link"
            onClick={() => {
              setCurrentMenu("main");
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
