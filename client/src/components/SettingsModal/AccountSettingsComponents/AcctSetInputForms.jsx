import { useState, useEffect } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/esm/Col";

import "./accountSetInputForm.css";

const AcctSetInputForm = ({
  isEditing,
  setIsEditing,
  inputValue,
  setInputValue,
  inputRef,
  handleUpdate,
  label,
  userData,
  updateAlert,
  setUpdateAlert,
}) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (updateAlert) {
      const fadeTimer = setTimeout(() => {
        setFadeOut(true);
      }, 3000);

      const removeTImer = setTimeout(() => {
        setUpdateAlert(null);
        setFadeOut(false);
      }, 4000);

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(removeTImer);
      };
    }
  }, [updateAlert]);

  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      {isEditing ? (
        <>
          <Form.Control
            className="mb-2"
            type="text"
            value={inputValue}
            ref={inputRef}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          />
          {/* <div className="d-flex justify-content-end"> */}
          <Row className="align-items-center" style={{ height:"48px" }}>
            {/* <Col>
              {updateAlert && (
                <p className={`update-alert ${fadeOut ? "fade-out" : ""}`}>
                  {updateAlert}
                </p>
              )}
            </Col> */}
            <Col className="ms-auto text-end">
              <Button
                variant="secondary"
                onClick={() => {
                  handleUpdate();
                  setIsEditing(false);
                }}
                className="ms-2"
              >
                Save
              </Button>
              <Button
                variant="outline-secondary"
                onClick={() => {
                  setIsEditing(false);
                  setInputValue(userData.username);
                }}
                className="ms-2"
              >
                Cancel
              </Button>
            </Col>
          </Row>
          {/* </div> */}
        </>
      ) : (
        <>
          <Form.Control
            className="mb-2"
            type="text"
            value={inputValue}
            ref={inputRef}
            readOnly
          />
          {/* <div className="d-flex justify-content-end"> */}
          <Row className="align-items-center" style={{ height:"48px" }}>
            <Col className="col-8">
            {updateAlert && (
              <p className={`me-3 update-alert ${fadeOut ? "fade-out" : ""}`}>
                {updateAlert}
              </p>
            )}
            </Col>
            <Col className="ms-auto text-end">
            <Button
              variant="outline-secondary"
              onClick={() => {
                setIsEditing(true);
                if (inputRef.current) {
                  inputRef.current.focus();
                }
              }}
            >
              Edit
            </Button>
            </Col>
          </Row>
          {/* </div> */}
        </>
      )}
    </Form.Group>
  );
};

export default AcctSetInputForm;
