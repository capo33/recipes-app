import axios from "axios";

import { AUTH_URL } from "../../../constants/constants";
import { AuthUser } from "../../../interfaces/AuthInterface";

// *************************** Auth *************************** //
// register
const register = async (formData: AuthUser) => {
  const response = await axios.post(`${AUTH_URL}/register`, formData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// login
const login = async (formData: AuthUser) => {
  const response = await axios.post(`${AUTH_URL}/login`, formData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// logout
const logout = () => {
  localStorage.removeItem("user");
};

// get user
const getUserProfile = async (token: string) => {
  const response = await axios.get(`${AUTH_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const authServices = {
  register,
  login,
  logout,
  getUserProfile,
};

export default authServices;
