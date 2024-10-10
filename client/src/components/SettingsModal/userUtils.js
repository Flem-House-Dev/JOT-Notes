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
const updateUsername = async () => {
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
    //   setUsername(updatedUser.username);
    //   setAlert("Username updated successfully");
    } catch (error) {
      console.error("Unable to update username", error);
    //   setAlert("Error updating username");
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
    //   setEmail(updatedUser.email);
    //   setAlert("Email updated successfully");
    } catch (error) {
      console.error("Unable to update email", error);
    //   setAlert("Error updating email");
    }
  };

export { getUserData, updateUsername, updateEmail };