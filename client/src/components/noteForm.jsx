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
    <form
      className="note-form"
      onSubmit={(event) => {
        event.preventDefault();
        selectedNote ? handleUpdateNote(event) : handleAddNote(event);
      }}
    >
      <input
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        name="title"
        type="text"
        placeholder="Title"
        required
      />
      <textarea
        value={content}
        onChange={(event) => setContent(event.target.value)}
        name="content"
        placeholder="note"
        rows={10}
        required
      ></textarea>

      {selectedNote ? (
        <div className="edit-buttons">
          <button type="submit">Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <button type="submit">Add Note</button>
      )}
    </form>
  );
};

export default NoteForm;
