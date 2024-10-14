import { useState, useRef } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
// import Alert from "react-bootstrap/Alert";

import { updateUsername, updateEmail } from "../../utils/userUtils";
import AcctSetInputForm from "./AccountSettingsComponents/AcctSetInputForms";
import DeleteAcctForm from "./AccountSettingsComponents/DeleteAcctForm";

const AccountSettings = ({ userData, setUserData, onPasswordChange }) => {
  const [alertMessage, setAlertMessage] = useState({ type: "", message: "" });
  const [isEditingUserName, setIsEditingUserName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [username, setUsername] = useState(userData.username);
  const [email, setEmail] = useState(userData.email);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const usernameInputRef = useRef(null);
  const emailInputRef = useRef(null);

  const clearFormState = () => {
    setIsEditingUserName(false);
    setIsEditingEmail(false);
    setShowDeleteConfirm(false);
  };

  const handleUpdate = async (type) => {
    try {
      if (type === "username") await updateUsername(username);
      if (type === "email") await updateEmail(email);
      setAlertMessage({ type: "success", message: `${type} updated successfully` });
    } catch (error) {
      setAlertMessage({ type: "danger", message: `Error updating ${type}` });
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
          handleUpdate={() => handleUpdate("username")}
          clearFormState={clearFormState}
          label="Username"
        />

        {/* Email Section */}
        <AcctSetInputForm
          isEditing={isEditingEmail}
          setIsEditing={setIsEditingEmail}
          inputValue={email}
          setInputValue={setEmail}
          inputRef={emailInputRef}
          handleUpdate={() => handleUpdate("email")}
          alertMessage={alertMessage}
          clearFormState={clearFormState}
          label="Email"
        />

        {/* Change Password Section */}
        <Form.Group className="mt-4">
          <Button
            variant="secondary"
            onClick={() => {
              clearFormState();
              onPasswordChange();
            }}
            style={{ width: "160px" }}
          >
            Change Password
          </Button>
        </Form.Group>

        {/* Delete Account Section */}
        <DeleteAcctForm
          showDeleteConfirm={showDeleteConfirm}
          setShowDeleteConfirm={setShowDeleteConfirm}
        />
        
        {/* <Form.Group className="mt-4">
          <Button
            variant="danger"
            onClick={() => setShowDeleteConfirm(true)}
            style={{ width: "160px" }}
          >
            Delete Account
          </Button>

     
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
        </Form.Group> */}
        
      </Form>
    </>
  );
};

export default AccountSettings;
