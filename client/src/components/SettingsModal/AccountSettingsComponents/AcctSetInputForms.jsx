import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

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
}) => {
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
          <div className="d-flex justify-content-end">
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
          </div>
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
          <div className="d-flex justify-content-end">
            {updateAlert && <p className="me-3">{updateAlert}</p>}
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
          </div>
        </>
      )}
    </Form.Group>
  );
};

export default AcctSetInputForm;
