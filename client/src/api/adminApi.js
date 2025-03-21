import http from "./http";

const createDoctor = (data) =>
  http.post(`${process.env.REACT_APP_BASE_URL}/admin/create-doctor`, data);

const deleteUser = (id) =>
  http.delete(`${process.env.REACT_APP_BASE_URL}/admin/delete-user/${id}`);

const deleteAppointment = (id) =>
  http.delete(
    `${process.env.REACT_APP_BASE_URL}/admin/delete-appointment/${id}`
  );
const getUsers = () =>
  http.get(`${process.env.REACT_APP_BASE_URL}/admin/users`);
const getAppointments = () =>
  http.get(`${process.env.REACT_APP_BASE_URL}/admin/appointments`);

const adminApi = {
  createDoctor,
  deleteUser,
  deleteAppointment,
  getUsers,
  getAppointments,
};
export default adminApi;
