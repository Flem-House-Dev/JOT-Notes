import { useState, useRef } from "react";
// import { Form, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

import { updateUsername, updateEmail } from "./utils/userUtils";
import AcctSetInputForm from "./AccountSettingsComponents/AcctSetInputForms";

const AccountSettings = ({ userData, setUserData, onPasswordChange }) => {
  const [updateUsernameAlert, setupdateUsernameAlert] = useState(null);
  const [updateUserEmailAlert, setupdateUserEmailAlert] = useState(null);
  const [isEditingUserName, setIsEditingUserName] = useState(false);
  const [username, setUsername] = useState(userData.username);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [email, setEmail] = useState(userData.email);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const clearSettingsFormStates = () => {
    setIsEditingUserName(false);
    setIsEditingEmail(false);
    setShowDeleteConfirm(false);
  };

  const usernameInputRef = useRef(null);
  const emailInputRef = useRef(null);

  const handleUpdateUsername = async () => {
    try {
      await updateUsername(username);
      setupdateUsernameAlert("Username updated successfully");
    } catch (error) {
      setupdateUsernameAlert("Error updating username");
    }
  };

  const handleUpdateEmail = async () => {
    try {
      await updateEmail(email);
      setupdateUserEmailAlert("Email updated successfully");
    } catch (error) {
      setupdateUserEmailAlert("Error updating email");
    }
  };

  return (
    <>
      <h5>Account Settings</h5>

      <Form>
        {/* Username Section */}

        <AcctSetInputForm
          isEditing={isEditingUserName}
          setIsEditing={setIsEditingUserName}
          inputValue={username}
          setInputValue={setUsername}
          inputRef={usernameInputRef}
          handleUpdate={handleUpdateUsername}
          userData={userData}
          updateAlert={updateUsernameAlert}
          setUpdateAlert={setupdateUsernameAlert}
          clearSettingsFormStates={clearSettingsFormStates}
          label="Username"
        />

        {/* Email Section */}
        <AcctSetInputForm
          isEditing={isEditingEmail}
          setIsEditing={setIsEditingEmail}
          inputValue={email}
          setInputValue={setEmail}
          inputRef={emailInputRef}
          handleUpdate={handleUpdateEmail}
          userData={userData}
          updateAlert={updateUserEmailAlert}
          clearSettingsFormStates={clearSettingsFormStates}
          label="Email"
        />

        {/* Change Password Section */}
        <Form.Group className="mt-4">
          <Button
            variant="secondary"
            onClick={() => {
              clearSettingsFormStates();
              onPasswordChange();
            }}
            style={{ width: "160px" }}
          >
            Change Password
          </Button>
        </Form.Group>

        {/* Delete Account Section */}
        <Form.Group className="mt-4">
          <Button
            variant="danger"
            onClick={() => setShowDeleteConfirm(true)}
            style={{ width: "160px" }}
          >
            Delete Account
          </Button>

          {/* Confirmation of Account Deletion */}
          {showDeleteConfirm && (
            <Alert variant="danger" className="mt-3">
              <Alert.Heading>Are you sure?</Alert.Heading>
              <p>
                This action cannot be undone. Do you want to proceed with
                deleting your account?
              </p>
              <div className="d-flex justify-content-between">
                <Button
                  variant="secondary"
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="danger"
                  onClick={() => alert("Account Deleted")}
                >
                  Yes, Delete
                </Button>
              </div>
            </Alert>
          )}
        </Form.Group>
      </Form>
    </>
  );
};

export default AccountSettings;
