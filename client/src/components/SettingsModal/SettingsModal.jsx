import { useState, useRef, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import Alert from "react-bootstrap/Alert";
import { ArrowLeft } from "react-bootstrap-icons";

const SettingsModal = ({ showModal, handleCloseModal }) => {
  const [currentMenu, setCurrentMenu] = useState("main");
  const [isEditingUserName, setIsEditingUserName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [username, setUsername] = useState("currentUsername");
  const [email, setEmail] = useState("currentEmail");
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const usernameInputRef = useRef(null);
  const emailInputRef = useRef(null);

  // get user data from token
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUsername(decodedToken.username);
      setEmail(decodedToken.email);
    }
  }, [showModal]);

  const renderMenu = () => {
    switch (currentMenu) {
      case "profile":
        return (
          <div>
            <h5>Account Settings</h5>
            {/* back button */}
            {/* <Button variant="Link" onClick={() => setCurrentMenu("main")}>
              &larr; Back
            </Button> */}

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
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <div className="d-flex justify-content-end">
                      <Button
                        variant="outline-secondary"
                        onClick={() => setIsEditingUserName(false)}
                        className="ms-2"
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => setIsEditingUserName(false)}
                        className="ms-2"
                      >
                        Save
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
                        variant="outline-secondary"
                        onClick={() => setIsEditingEmail(false)}
                        className="ms-2"
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => setIsEditingEmail(false)}
                        className="ms-2"
                      >
                        Save
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <Form.Control
                      className="mb-2"
                      type="emai"
                      value={email}
                      ref={emailInputRef}
                      readOnly
                    />
                    <div className="d-flex justify-content-end">
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
                  variant="warning"
                  onClick={() => {
                    setCurrentMenu("password");
                    // setShowPasswordForm(true);

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
          </div>
        );

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
                      <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                      />
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
    <Modal show={showModal} onHide={()=> {
      handleCloseModal();
      setCurrentMenu("main");
    }}>
      <Modal.Header closeButton>
        <Modal.Title>Settings</Modal.Title>
      </Modal.Header>
      <Modal.Body>{renderMenu()}</Modal.Body>
      <Modal.Footer>
        {currentMenu === "main" ? (
          <Button variant="secondary" onClick={() => {
            handleCloseModal();
            setCurrentMenu("main");
          }}>
            Close
          </Button>
        ) : (
          <Button
            variant="Link"
            onClick={() => {
              setCurrentMenu("main");
              setShowPasswordForm(false);
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
