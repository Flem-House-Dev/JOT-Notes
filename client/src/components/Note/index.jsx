import Card from 'react-bootstrap/Card';
import { XSquare } from 'react-bootstrap-icons';


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
    // <>
    //   <div className="note-item note-card" onClick={() => handleNoteClick(note)}>
    //     <div
    //       className="notes-header"
    //       onClick={(event) => deleteNote(event, note._id)}
    //     >
    //       <button>x</button>
    //     </div>
    //     <h3 className="note-title">{note.title}</h3>
    //     <p className="note-snippet">{note.content}</p>
    //     {/* <span className="note-date"></span> */}
    //   </div>
    // </>

    <>
      <Card className='p-2' style={{ width: "18rem" }}>
        <div className="" onClick={() => handleNoteClick(note)}>
          <div
            className="notes-header"
            onClick={(event) => deleteNote(event, note._id)}
          >
            <XSquare className='close-btn'/>
          </div>
          <Card.Body>
            <Card.Title className="n">{note.title}</Card.Title>
            <Card.Text className="">{note.content}</Card.Text>
            {/* <span className="note-date"></span> */}
          </Card.Body>
        </div>
      </Card>
    </>
  );
};

export default Note;
