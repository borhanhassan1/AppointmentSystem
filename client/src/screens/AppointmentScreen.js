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

// Helper function to format date as YYYY-MM-DD (local time)
const getLocalDateString = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

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
        const localDate = getLocalDateString(selectedDate);
        const res = await appointmentApi.bookedSlots(localDate);
        
        // Convert UTC hours to local hours
        const utcHours = res.data.bookedSlots || [];
        const localHours = utcHours.map(utcHour => {
          const date = new Date(selectedDate);
          date.setUTCHours(utcHour, 0, 0, 0);
          return date.getHours();
        });
        
        setBookedSlots(localHours);
      } catch (err) {
        toast.error(
          err.response?.data?.message || "An unexpected error occurred."
        );
      }
    };

    fetchBookedSlots();
  }, [selectedDate, reload]);

  // ... rest of the component remains the same
};

export default AppointmentScreen;
