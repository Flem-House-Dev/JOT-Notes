import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const ImputForms = () => {

    return (
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
    );
};

export default ImputForms;