import http from "./http";

const createUser = (data) =>
  http.post(`${process.env.REACT_APP_BASE_URL}/user/register`, data);
const loginUser = (data) =>
  http.post(`${process.env.REACT_APP_BASE_URL}/user/login`, data);

const usersApi = { createUser, loginUser };
export default usersApi;
