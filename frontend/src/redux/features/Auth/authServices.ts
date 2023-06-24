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

const authServices = {
  register,
  login,
  logout,
};

export default authServices;
