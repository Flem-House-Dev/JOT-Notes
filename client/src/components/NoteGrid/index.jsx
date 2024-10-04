import React, { useEffect, useContext } from "react";
import Note from "../Note";
import AuthContext from "../../context/AuthContext";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const NoteGrid = ({
  notes,
  setNotes,
  setTitle,
  setContent,
  setSelectedNote,
}) => {
  const { user } = useContext(AuthContext);
  // ---------------------------------------------------

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const token = localStorage.getItem("userToken");
        const response = await fetch("/api/notes", {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch notes: ${response.status}`);
        }

        const savedNotes = await response.json();
        setNotes(savedNotes);
      } catch (error) {
        console.error("Error fetching notes: ", error);
        throw error;
      }
    };

    fetchNotes();
  }, [user]);

  // ---------------------------------------------------

  return (
    <Container fluid className="w-75 m-auto">
      <Row>
        {notes.map((n) => (
          <Col className="flex-grow-0" key={n._id} xs={12} md={6} lg={3}>
            <div className="mb-4 d-flex justify-content-start">
              <Note
                note={n}
                notes={notes}
                setContent={setContent}
                setNotes={setNotes}
                setSelectedNote={setSelectedNote}
                setTitle={setTitle}
              />
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default NoteGrid;
