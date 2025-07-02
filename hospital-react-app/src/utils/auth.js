// src/utils/auth.js

export const getCurrentUserRole = () => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    console.warn("Token not found");
    return null;
  }

  try {
    const payloadBase64 = token.split(".")[1];
    const decodedPayload = JSON.parse(atob(payloadBase64));
    console.log("Decoded payload:", decodedPayload); // LOG QUAN TRỌNG
    return decodedPayload.role || null;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};
