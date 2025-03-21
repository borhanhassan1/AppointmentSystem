import React, { useState, useContext, useEffect } from "react";
import TimeSlotSelector from "../components/TimeSlotSelector";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "react-modal";
import "../CSS/appointment.css";
import { toast } from "react-toastify";
import appointmentApi from "../api/appointmentApi";
import UserContext from "../context/userContext";

Modal.setAppElement("#root");

const AppointmentScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [reload, setReload] = useState(false);
  const { user } = useContext(UserContext);

  const handleTimeSelect = (time) => {
    if (!selectedDate) {
      toast.error("Please select a date first!");
      return;
    }
    setSelectedTime(time);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchBookedSlots = async () => {
      if (!selectedDate) return;

      try {
        const res = await appointmentApi.bookedSlots(
          selectedDate.toISOString().split("T")[0]
        );
        console.log(res.data.bookedSlots);
        setBookedSlots(res.data.bookedSlots || []);
      } catch (err) {
        toast.error(
          err.response?.data?.message || "An unexpected error occurred."
        );
      }
    };

    fetchBookedSlots();
  }, [selectedDate, reload]);
  if (!user) {
    return (
      <h2 className="error-message">
        Please log in to view your appointments.
      </h2>
    );
  }
  const confirmAppointment = async () => {
    if (!selectedDate || !selectedTime) {
      toast.error("Please select both a date and a time.");
      return;
    }

    if (!user?.userId) {
      toast.error("User not found. Please log in.");
      return;
    }

    let appointmentDate = new Date(selectedDate);
    if (isNaN(appointmentDate.getTime())) {
      toast.error("Invalid date selected.");
      return;
    }

    const hours = parseInt(selectedTime, 10);
    if (isNaN(hours) || hours < 0 || hours > 23) {
      toast.error("Invalid time format.");
      return;
    }
    appointmentDate.setHours(hours, 0, 0, 0);

    try {
      setLoading(true);
      const res = await appointmentApi.createAppointment({
        userId: user.userId,
        date: appointmentDate.toISOString(),
      });

      toast.success("✅ Appointment booked successfully!");
      setSelectedDate(selectedDate);
      setSelectedTime(null);
      setReload(!reload);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "An unexpected error occurred."
      );
    } finally {
      setLoading(false);
      setIsModalOpen(false);
    }
  };

  return (
    <div className="appointment-container">
      <h2 className="appointment-title">Book an Appointment</h2>

      <label>Select a Date:</label>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date || new Date())}
        minDate={new Date()}
        className="date-picker"
      />

      <TimeSlotSelector
        onTimeSelect={handleTimeSelect}
        bookedSlots={bookedSlots}
      />

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="modal-overlay"
      >
        <div className="modal-content">
          <h3 className="modal-title">Confirm Your Appointment</h3>
          <p className="modal-text">
            Are you sure you want to book on{" "}
            <strong>{selectedDate?.toDateString()}</strong> at{" "}
            <strong>{selectedTime}</strong>?
          </p>
          <div className="modal-buttons">
            <button
              onClick={confirmAppointment}
              className="confirm-btn"
              disabled={loading}
            >
              {loading ? "Booking..." : " Yes, Confirm"}
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="cancel-btn"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AppointmentScreen;
