import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";

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
  const handleAddNote = async (event) => {
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
    } catch (error) {
      console.error(error);
    }
  };

  // ---------------------------------------------------

  const handleUpdateNote = async (event) => {
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
    } catch (error) {
      console.error(error);
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
    <div className="note-form-container">
      <Card className="p-3 w-50">
        <Form
          // className="note-form"
          onSubmit={(event) => {
            event.preventDefault();
            selectedNote ? handleUpdateNote(event) : handleAddNote(event);
          }}
        >
          {/* <input
            // className="note-title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            name="title"
            type="text"
            placeholder="Title"
            required
          /> */}

          <FloatingLabel label="Title" controlId="floatingInput">
            <Form.Control
              className="mb-3"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              name="title"
              placeholder="Title"
            ></Form.Control>
          </FloatingLabel>

          {/* <textarea
            className="note-content"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            name="content"
            placeholder="note"
            rows={10}
            required
          ></textarea> */}

          <FloatingLabel controlId="floaoatingTextarea" label="Note">
            <Form.Control
            className="mb-3"
              as={"textarea"}
              value={content}
              onChange={(event) => setContent(event.target.value)}
              name="content"
              placeholder="note"
              style={{ height: "100px" }}
            ></Form.Control>
          </FloatingLabel>

          {/* <div className="note-form-actions">
            {selectedNote ? (
              <div className="edit-buttons">
                <button className="save-btn" type="submit">
                  Save
                </button>
                <button className="cancel-btn" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            ) : (
              <button className="add-btn" type="submit">
                Add Note
              </button>
            )}
          </div> */}

                 <div className="note-form-actions ">
            {selectedNote ? (
              <div className="edit-buttons">
                <Button className="me-3" variant="primary" type="submit">
                  Save
                </Button>
                <Button className="cancel-btn" variant="danger" onClick={handleCancel}>
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
