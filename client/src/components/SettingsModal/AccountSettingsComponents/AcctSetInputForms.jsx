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
  clearFormState,
}) => {
  const [alertMessage, setAlertMessage] = useState({ type: "", message: "" });
  const [fadeOut, setFadeOut] = useState(false);

  const handleSave = async () => {
    try {
      await handleUpdate();
      setAlertMessage({
        type: "success",
        message: `${label} updated successfully`,
      });
    } catch (error) {
      setAlertMessage({ type: "danger", message: `Error updating ${label}` });
    } finally {
      setIsEditing(false);
    }
  };

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
  }, [alertMessage, clearFormState]);

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
          <Row className="align-items-center" style={{ height: "48px" }}>
            <Col className="ms-auto text-end">
              <Button
                variant="secondary"
                onClick={handleSave}
                className="ms-2"
              >
                Save
              </Button>
              <Button
                variant="outline-secondary"
                onClick={() => {
                  setIsEditing(false);
                  setInputValue(inputValue?.current?.value || "");
                }}
                className="ms-2"
              >
                Cancel
              </Button>
            </Col>
          </Row>
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
          <Row className="align-items-center" style={{ height: "48px" }}>
            <Col className="col-8">
              {alertMessage.message && (
                <p
                  className={`me-3 update-alert ${fadeOut ? "fade-out" : ""}`}
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
            </Col>
            <Col className="ms-auto text-end">
              <Button
                variant="outline-secondary"
                onClick={() => {
                  setIsEditing(true);
                  if (inputRef.current) {
                    inputRef?.current?.focus();
                  }
                }}
              >
                Edit
              </Button>
            </Col>
          </Row>
        </>
      )}
    </Form.Group>
  );
};

export default AcctSetInputForm;
