import Form from "react-bootstrap/Form";

const Preferences = () => {
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
};

export default Preferences;
