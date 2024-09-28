import React, { useEffect, useContext } from "react";
import Note from "./note";
import AuthContext from "../context/AuthContext";

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
            Authorization: 'Bearer ' + token,
          }
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
    <div className="notes-grid">
      {notes.map((n) => (
        <Note
          note={n}
          key={n._id}
          notes={notes}
          setContent={setContent}
          setNotes={setNotes}
          setSelectedNote={setSelectedNote}
          setTitle={setTitle}
        />
      ))}
    </div>
  );
};

export default NoteGrid;
