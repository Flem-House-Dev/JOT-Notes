import { jwtDecode } from "jwt-decode";

const getUserData = () => {
    const token = localStorage.getItem("userToken");
    if (token) {
        const decodedToken = jwtDecode(token);
        return {
        username: decodedToken.username,
        email: decodedToken.email,
        };
    }
    return { username: "", email: "" };
};

// update username
const updateUsername = async (username) => {
    try {
      // get user token userID

      const token = localStorage.getItem("userToken");
      const decodedToken = jwtDecode(token);

      const userId = decodedToken.userId;
      const newUsername = username;

      const response = await fetch("/api/user/userName", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
        body: JSON.stringify({ newUsername, userId }),
      });

      const updatedUser = await response.json();
      localStorage.setItem("userToken", updatedUser.token);
    } catch (error) {
      console.error("Unable to update username", error);
    }
  };

  // update email
  const updateEmail = async () => {
    try {
      // get user token userID
      const token = localStorage.getItem("userToken");
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      const newEmail = email;

      const response = await fetch("/api/user/userEmail", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
        body: JSON.stringify({ newEmail, userId }),
      });

      const updatedUser = await response.json();
      localStorage.setItem("userToken", updatedUser.token);
    } catch (error) {
      console.error("Unable to update email", error);
    }
  };

  // update password
  const updatePassword = async (currentPassword, newPassword) => {
    try {
      // get user token userID
      const token = localStorage.getItem("userToken");
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;

      const response = await fetch("/api/user/userPassword", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
          userId,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        return { error: error.message };
      }

    } catch (error) {
      console.error("Error changing password: ", error);
    }
  };

export { getUserData, updateUsername, updateEmail, updatePassword };