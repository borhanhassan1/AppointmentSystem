import http from "./http";

const createUser = (data) =>
  http.post(`https://appointment-system-fawn.vercel.app/api/user/register`, data);
const loginUser = (data) =>
  http.post(`https://appointment-system-fawn.vercel.app/api/user/login`, data);

const usersApi = { createUser, loginUser };
export default usersApi;
