import http from "./http";

const createAppointment = (data) =>
  http.post(`https://appointment-system-fawn.vercel.app/api/appointment/create`, data);
const bookedSlots = (date) =>
  http.get(`https://appointment-system-fawn.vercel.app/api/appointment/booked-slots`, {
    params: { date: encodeURIComponent(date) },
  });
const getUserAppointments = (userId) =>
  http.get(`https://appointment-system-fawn.vercel.app/api/appointment/${userId}`);

const appointmentApi = { createAppointment, bookedSlots, getUserAppointments };
export default appointmentApi;
