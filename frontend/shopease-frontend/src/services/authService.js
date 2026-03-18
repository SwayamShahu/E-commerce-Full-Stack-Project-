import api from "./api";

// REGISTER USER
export const registerUser = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

// LOGIN USER
export const loginUser = async (loginData) => {
  const response = await api.post("/auth/login", loginData);
  return response.data;
};

