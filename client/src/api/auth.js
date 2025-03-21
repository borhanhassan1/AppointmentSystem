import { jwtDecode } from "jwt-decode";

const key = "token";

const setToken = (token) => localStorage.setItem(key, token);
const deleteToken = () => localStorage.removeItem(key);
const getToken = () => localStorage.getItem(key);
const getUser = () => {
  const token = getToken();
  if (!token) {
    return null;
  }
  return jwtDecode(token);
};

const authApi = { setToken, deleteToken, getToken, getUser };
export default authApi;
