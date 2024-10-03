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
      <Card className='note-card p-2' style={{ width: "16rem" }}>
        <div className="" onClick={() => handleNoteClick(note)}>
          <div
            className="notes-header"
            onClick={(event) => deleteNote(event, note._id)}
          >
            <XSquare className='close-btn'/>
          </div>
          <Card.Body>
            <Card.Title>{note.title}</Card.Title>
            <Card.Text>{note.content}</Card.Text>
            {/* <span className="note-date"></span> */}
          </Card.Body>
        </div>
      </Card>
    </>
  );
};

export default Note;
