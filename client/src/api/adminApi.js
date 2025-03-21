import http from "./http";

const createDoctor = (data) =>
  http.post(`https://appointment-system-fawn.vercel.app/api/admin/create-doctor`, data);

const deleteUser = (id) =>
  http.delete(`https://appointment-system-fawn.vercel.app/api/admin/delete-user/${id}`);

const deleteAppointment = (id) =>
  http.delete(
    `https://appointment-system-fawn.vercel.app/api/admin/delete-appointment/${id}`
  );
const getUsers = () =>
  http.get(`https://appointment-system-fawn.vercel.app/api/admin/users`);
const getAppointments = () =>
  http.get(`https://appointment-system-fawn.vercel.app/api/admin/appointments`);

const adminApi = {
  createDoctor,
  deleteUser,
  deleteAppointment,
  getUsers,
  getAppointments,
};
export default adminApi;
