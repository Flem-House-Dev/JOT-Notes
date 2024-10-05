import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import NoteForm from "../components/NoteForm";
import NoteGrid from "../components/NoteGrid";
import AuthContext from "../context/AuthContext";
import "../App.css";

import Button from "react-bootstrap/Button";
import Header from "../components/Header";

const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedNote, setSelectedNote] = useState("");

  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="p-4 bg-light min-vh-100">
      {/* <div className="notes-page-header d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-primary">JOT Notes</h1>
        <Button className="btn" variant="outline-secondary" onClick={handleLogout}>
          Logout
        </Button>
      </div> */}
      <Header handleLogout={handleLogout} />
      <NoteForm
        title={title}
        notes={notes}
        content={content}
        selectedNote={selectedNote}
        setTitle={setTitle}
        setContent={setContent}
        setNotes={setNotes}
        setSelectedNote={setSelectedNote}
      />

      <NoteGrid
        // className="note-grid"
        notes={notes}
        setNotes={setNotes}
        setSelectedNote={setSelectedNote}
        setTitle={setTitle}
        setContent={setContent}
      />
    </div>
  );
};

export default NotesPage;
