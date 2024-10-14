import { jwtDecode } from "jwt-decode";

const getDecodedToken = () => {
  const token = localStorage.getItem("userToken");
  return token ? jwtDecode(token) : null;
};

const getUserData = () => {
  // const token = localStorage.getItem("userToken");
  const decodedToken = getDecodedToken();
  return decodedToken
    ? { username: decodedToken.username, email: decodedToken.email }
    : { username: "", email: "" };
};

const apiRequest = async (url, method, body) => {
  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "API request failed");
    }

    return await response.json();
  } catch (error) {
    console.error(`Error with ${method} request to ${url}:`, error);
    throw error;
  }
};

// update username
const updateUsername = async (username) => {
  const decodedToken = getDecodedToken();
  if (!decodedToken) throw new Error("User not authenticated");

  const { userId } = decodedToken;
  const data = await apiRequest("/api/user/userName", "PUT", {
    username,
    userId,
  });
  localStorage.setItem("userToken", data.token);
};

// update email
const updateEmail = async (email) => {
  const decodedToken = getDecodedToken();
  if (!decodedToken) throw new Error("User not authenticated");

  const { userId } = decodedToken;
  const data = await apiRequest("/api/user/userEmail", "PUT", {
    email,
    userId,
  });
  localStorage.setItem("userToken", data.token);
};

// update password
const updatePassword = async (currentPassword, newPassword) => {
  const decodedToken = getDecodedToken();
  if (!decodedToken) throw new Error("User not authenticated");

  const { userId } = decodedToken;
  const data = await apiRequest("/api/user/userPassword", "PUT", {
    currentPassword,
    newPassword,
    userId,
  });
  localStorage.setItem("userToken", data.token);
};

// delete account
const deleteAccount = async () => {
  const decodedToken = getDecodedToken();
  if (!decodedToken) throw new Error("User not authenticated");

  const { userId } = decodedToken;
  await apiRequest("/api/user/userDelete", "DELETE", { userId });
  localStorage.removeItem("userToken");
  // return new Promise((resolve) => setTimeout(resolve, 1000));
};

export {
  getUserData,
  updateUsername,
  updateEmail,
  updatePassword,
  deleteAccount,
};
