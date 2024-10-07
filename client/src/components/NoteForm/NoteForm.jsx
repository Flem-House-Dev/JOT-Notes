import { useState } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
const NoteForm = ({
  title,
  content,
  setTitle,
  setContent,
  setNotes,
  notes,
  selectedNote,
  setSelectedNote,
}) => {
  // ---------------------------------------------------
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [message, setMessage] = useState(null); // State for success message

  const handleAddNote = async (event) => {
    setLoading(true); // Set loading state before API call
    event.preventDefault();

    try {
      const token = localStorage.getItem("userToken");
      const response = await fetch("/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          content,
        }),
      });

      const newNote = await response.json();

      setNotes([newNote, ...notes]);
      setTitle("");
      setContent("");
      setMessage("Note added successfully!"); // Set success message
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Clear loading state after API call
    }
  };

  // ---------------------------------------------------

  const handleUpdateNote = async (event) => {
    setLoading(true); // Set loading state before API call
    event.preventDefault();

    if (!selectedNote) {
      return;
    }

    try {
      const token = localStorage.getItem("userToken");
      const response = await fetch(`/api/notes/${selectedNote._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          content,
        }),
      });

      const updatedNote = await response.json();

      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note._id === selectedNote._id ? updatedNote : note
        )
      );
      setTitle("");
      setContent("");
      setSelectedNote(null);
      setMessage("Note updated successfully!"); // Set success message
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Clear loading state after API call
    }
  };

  // ---------------------------------------------------

  const handleCancel = () => {
    setTitle("");
    setContent("");
    setSelectedNote(null);
  };

  // ---------------------------------------------------

  return (
    <div className="note-form-container d-flex justify-content-center align-items-center mb-5">
      <Card className="note-form-card p-3 ">
        <Form
          onSubmit={(event) => {
            event.preventDefault();
            selectedNote ? handleUpdateNote(event) : handleAddNote(event);
          }}
        >
          {loading && <Spinner animation="border" />}{" "}
          {/* Conditionally render loading spinner */}
          {/* {message && <Alert variant="success">{message}</Alert>} */}
          {/* Conditionally render success message */}
          <FloatingLabel label="Title" controlId="floatingInput">
            <Form.Control
              className="note-form-title mb-3"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              name="title"
              placeholder="Title"
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingTextarea" label="Note">
            <Form.Control
              className="note-form-content mb-3"
              as="textarea"
              value={content}
              onChange={(event) => setContent(event.target.value)}
              name="content"
              placeholder="note"
              style={{ height: '100px' }} // Set the height of the textarea
            />
          </FloatingLabel>
          <div className="note-form-actions d-flex justify-content-end ">
            {selectedNote ? (
              <div className="edit-buttons">
                <Button
                  className="save-btn me-3"
                  variant="primary"
                  type="submit"
                >
                  Save
                </Button>
                <Button
                  className="cancel-btn"
                  variant="danger"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <Button className="add-btn" variant="primary" type="submit">
                Add Note
              </Button>
            )}
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default NoteForm;
