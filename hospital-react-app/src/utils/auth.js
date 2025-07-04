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
export const isTokenExpired = () => {
  const token = localStorage.getItem("authToken");
  if (!token) return true;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp < currentTime;
  } catch (error) {
    console.error("Error checking token expiration:", error);
    return true;
  }
};
export const checkTokenAndProceed = async (callback) => {
  if (isTokenExpired()) {
    alert("Your session has expired. Please log in again.");
    localStorage.removeItem("authToken");
    window.location.href = "/login";
  } else {
    await callback(); // ⬅ THÊM await
  }
};
