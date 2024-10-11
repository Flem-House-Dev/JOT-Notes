import { useState, useRef } from "react";
// import { Form, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

const AccountSettings = ({
  userData,
  setUserData,
  onPasswordChange,
  updateUsername,
  updateEmail,
}) => {
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
        <Form.Group>

          <Form.Label>Username</Form.Label>
          {isEditingUserName ? (
            <>
              <Form.Control
                className="mb-2"
                type="text"
                value={username}
                ref={usernameInputRef}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              <div className="d-flex justify-content-end">
                <Button
                  variant="secondary"
                  onClick={() => {
                    handleUpdateUsername();
                    setIsEditingUserName(false);
                  }}
                  className="ms-2"
                >
                  Save
                </Button>
                <Button
                  variant="outline-secondary"
                  onClick={() => {
                    setIsEditingUserName(false);
                    setUsername(userData.username);}}
                  className="ms-2"
                >
                  Cancel
                </Button>
              </div>
            </>
          ) : (
            <>
              <Form.Control
                className="mb-2"
                type="text"
                value={username}
                ref={usernameInputRef}
                readOnly
              />
              <div className="d-flex justify-content-end">
                {updateUsernameAlert && (
                  <p className="me-3">{updateUsernameAlert}</p>
                )}
                <Button
                  variant="outline-secondary"
                  onClick={() => {
                    setIsEditingUserName(true);
                    if (usernameInputRef.current) {
                      usernameInputRef.current.focus();
                    }
                  }}
                >
                  Edit
                </Button>
              </div>
            </>
          )}
        </Form.Group>

        {/* Email Section */}
        <Form.Group className="mt-3">
          <Form.Label>Email</Form.Label>
          {isEditingEmail ? (
            <>
              <Form.Control
                className="mb-2"
                type="email"
                value={email}
                ref={emailInputRef}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="d-flex justify-content-end">
                <Button
                  variant="secondary"
                  onClick={() => {
                    handleUpdateEmail();
                    setIsEditingEmail(false);
                  }}
                  className="ms-2"
                >
                  Save
                </Button>
                <Button
                  variant="outline-secondary"
                  onClick={() => {
                    setIsEditingEmail(false);
                    setEmail(userData.email);
                  }}
                  className="ms-2"
                >
                  Cancel
                </Button>
              </div>
            </>
          ) : (
            <>
              <Form.Control
                className="mb-2"
                type="email"
                value={email}
                ref={emailInputRef}
                readOnly
              />
              <div className="d-flex justify-content-end">
                {updateUserEmailAlert && (
                  <p className="me-3">{updateUserEmailAlert}</p>
                )}
                <Button
                  variant="outline-secondary"
                  onClick={() => {
                    setIsEditingEmail(true);
                    if (emailInputRef.current) {
                      emailInputRef.current.focus();
                    }
                  }}
                >
                  Edit
                </Button>
              </div>
            </>
          )}
        </Form.Group>

        {/* Change Password Section */}
        <Form.Group className="mt-4">
          <Button
            variant="secondary"
            onClick={() => {
              clearSettingsFormStates();
              //   setCurrentMenu("password");
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
