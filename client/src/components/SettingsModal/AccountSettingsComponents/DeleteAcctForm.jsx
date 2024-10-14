// delete account form
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";
import { deleteAccount } from "../../../utils/userUtils";
import AuthContext from "../../../context/AuthContext";
import { useState, useContext } from "react";

const DeleteAcctForm = ({ showDeleteConfirm, setShowDeleteConfirm }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const { logout } = useContext(AuthContext);

  const handleDeleteAccount = async () => {
    try {
      setLoading(true);
      await deleteAccount();
      logout();
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Error deleting account:", error);
      setError("Error deleting account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form.Group className="mt-4">
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
            This action cannot be undone. Do you want to proceed with deleting
            your account?
          </p>
          <div className="d-flex justify-content-between">
            <Button
              variant="secondary"
              onClick={() => {
                setShowDeleteConfirm(false);
                disabled = { loading };
              }}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleDeleteAccount}
              disabled={loading}
            >
              {loading ? "Deleting..." : "Yes, Delete"}
            </Button>
          </div>
          {error && (
            <Alert variant="danger" className="mt-3">
              {error}
            </Alert>
          )}
        </Alert>
      )}
    </Form.Group>
  );
};

export default DeleteAcctForm;
