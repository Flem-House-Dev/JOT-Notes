import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const PasswordChange = ({ setCurrentMenu, onCancel }) => {
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
            <Form.Control type="password" placeholder="Confirm Password" />
          </Form.Group>

          <div className="d-flex">
            <Button
              variant="outline-secondary"
              onClick={onCancel}
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
    )
};

export default PasswordChange;