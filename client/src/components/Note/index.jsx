import Card from 'react-bootstrap/Card';
import { XSquare } from 'react-bootstrap-icons';
import '../../loginPage.css';


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
          Authorization: "Bearer " + token,
        },
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
      <Card className='note-card p-2' style={{ width: "16rem", borderRadius: "10px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)" }}>
        <div className="" onClick={() => handleNoteClick(note)}>
          <div
            className="notes-header"
          >
            <XSquare
             className='close-btn'
             onClick={(event) => deleteNote(event, note._id)}
             style={{ cursor: 'pointer', color: "#888", transition: "color 0.3s" }}/>
          </div>
          <Card.Body>
            <Card.Title className='mb-2' style={{ fontWeight: "bold", fontSize: "1.25rem" }}>{note.title}</Card.Title>
            <Card.Text style={{ fontSize: "0.9rem", color: "#555" }}>{note.content}</Card.Text>
            <span className="note-date">{note.date}</span>
          </Card.Body>
        </div>
      </Card>
    </>
  );
};

export default Note;
