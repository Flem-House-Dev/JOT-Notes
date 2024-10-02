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
    <Container>
      <div className="">
        <div className="">
          <Row>
            {notes.map((n) => (
              <Col key={n._id}>
                <div className="mb-4">
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
        </div>
      </div>
    </Container>
  );
};

export default NoteGrid;
