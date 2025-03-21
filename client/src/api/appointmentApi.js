import http from "./http";

const createAppointment = (data) =>
  http.post(`${process.env.REACT_APP_BASE_URL}/appointment/create`, data);
const bookedSlots = (date) =>
  http.get(`${process.env.REACT_APP_BASE_URL}/appointment/booked-slots`, {
    params: { date: encodeURIComponent(date) },
  });
const getUserAppointments = (userId) =>
  http.get(`${process.env.REACT_APP_BASE_URL}/appointment/${userId}`);

const appointmentApi = { createAppointment, bookedSlots, getUserAppointments };
export default appointmentApi;
