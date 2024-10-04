import React, { useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotesPage from "./pages/NotesPage";
// import ProtectedRoute from "./components/ProtectedRoute";
import AuthContext, { AuthProvider } from "./context/AuthContext";

import "./App.css";
import "./loginPage.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

function AppContent() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? <Navigate to="/notes" /> : <Navigate to="/login" />
        }
      />
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/notes" /> : <LoginPage />}
      />
      <Route
        path="/register"
        element={isAuthenticated ? <Navigate to="/notes" /> : <RegisterPage />}
      />
      <Route
        path="/notes"
        element={isAuthenticated ? <NotesPage /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}

export default App;
