import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import NoteForm from "../components/NoteForm/NoteForm";
import NoteGrid from "../components/NoteGrid/NoteGrid";
import AuthContext from "../context/AuthContext";
import SettingsModal from "../components/SettingsModal/SettingsModal";

import "../App.css";

import Button from "react-bootstrap/Button";
import Header from "../components/Header/Header";
import SideMenu from "../components/SideMenu/SideMenu";

const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedNote, setSelectedNote] = useState("");

  // side menu state
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // modal state
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => {
    setShowModal(true);
    handleClose();
  };

  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const noteProps = {
    notes,
    setNotes,
    setTitle,
    setContent,
    setSelectedNote,
  };

  return (
    <div className="p-4 bg-light min-vh-100">
      <Header handleShow={handleShow} />
      <SideMenu
        show={show}
        handleShowModal={handleShowModal}
        handleClose={handleClose}
        handleShow={handleShow}
        handleLogout={handleLogout}
      />
      <NoteForm
        {...noteProps}
        title={title}
        // notes={notes}
        content={content}
        selectedNote={selectedNote}
        // setTitle={setTitle}
        // setContent={setContent}
        // setNotes={setNotes}
        // setSelectedNote={setSelectedNote}
      />

      <NoteGrid
        {...noteProps}
        // className="note-grid"
        // notes={notes}
        // setNotes={setNotes}
        // setSelectedNote={setSelectedNote}
        // setTitle={setTitle}
        // setContent={setContent}
      />
      <SettingsModal
        handleCloseModal={handleCloseModal}
        showModal={showModal}
      />
    </div>
  );
};

export default NotesPage;
