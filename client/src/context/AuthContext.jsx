import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Set Token and update user state
  const setToken = (token) => {
    localStorage.setItem("userToken", token);
    const decoded = jwtDecode(token);
    setUser(decoded);
    setIsAuthenticated(true);
  };

  // Register User
  const register = async (user) => {
    try {
      const response = await fetch("/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const data = await response.json();

        setToken(data.token);
      } else {
        const errorData = await response.json();
        console.error("Failed to register user", errorData);
        throw new Error(errorData.message ||"Failed to register user");
      }
    } catch (error) {
      console.error("Error during login: ", error);
      throw error;
    }
  };

  // Login User
  const login = async (user) => {
    try {
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const data = await response.json();

        setToken(data.token);
      } else {
        const errorData = await response.json();
        console.error("Failed to login user", errorData);
        throw new Error(errorData.message || "Failed to login user");
      }
    } catch (error) {
      console.error("Error during login: ", error);
      throw error;
    }
  };

  // Logout User
  const logout = async () => {
    localStorage.removeItem("userToken");
    setUser(null);
    setIsAuthenticated(false);
    // try {
    //   localStorage.removeItem("userToken");
    //   setUser(null);
    //   setIsAuthenticated(false);
    // } catch (error) {
    //   console.error(error);
    // }
  };

  
  useEffect(() => {
    // Check for existing token on app load
    const checkAuth = async () => {
      const token = localStorage.getItem("userToken");
      if (token) {
        try {
          const decoded = jwtDecode(token);
          if (decoded.exp > Date.now() / 1000) {
            setUser(decoded);
            setIsAuthenticated(true);
          } else {
            logout();
          }
        } catch (error) {
          console.error("Invalid token", error);
          logout();
        }
      }
    };
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, register, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
