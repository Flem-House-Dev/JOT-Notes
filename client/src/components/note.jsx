const Note = ({
  note,
  notes,
  setSelectedNote,
  setTitle,
  setContent,
  setNotes,
}) => {

  // ---------------------------------------------------

  const handleNoteClick = (note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  // ---------------------------------------------------

  const deleteNote = async (event, noteId) => {
    event.stopPropagation();

    try {
      const token = localStorage.getItem("userToken");
      await fetch(`/api/notes/${noteId}`, {
        method: "DELETE",
        headers: {
          Authorization: 'Bearer ' + token,
        }
      });

      const updatedNotes = notes.filter((note) => note._id !== noteId);

      setNotes(updatedNotes);
    } catch (error) {
      console.error(error);
    }
  };

  // ---------------------------------------------------

  return (
    <>
      <div
        className="note-item"
        // key={note._id}
        onClick={() => handleNoteClick(note)}
      >
        <div
          className="notes-header"
          onClick={(event) => deleteNote(event, note._id)}
        >
          <button>x</button>
        </div>
        <h2>{note.title}</h2>
        <p>{note.content}</p>
      </div>
    </>
  );
};

export default Note;
