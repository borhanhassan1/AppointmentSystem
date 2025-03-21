import React, { useEffect, useState, useContext } from "react";
import appointmentApi from "../api/appointmentApi";
import UserContext from "../context/userContext";
import "../CSS/checkAppointments.css";

function CheckAppointmentsScreen() {
  const { user } = useContext(UserContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!user) return;
      try {
        const res = await appointmentApi.getUserAppointments(user.userId);
        setAppointments(res.data.appointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
      setLoading(false);
    };

    fetchAppointments();
  }, [user]);

  if (!user) {
    return (
      <h2 className="error-message">
        Please log in to view your appointments.
      </h2>
    );
  }

  return (
    <div className="appointments-container">
      <h2>My Appointments</h2>
      {loading ? (
        <p>Loading...</p>
      ) : appointments.length > 0 ? (
        <ul className="appointments-list">
          {appointments.map((appointment) => (
            <li key={appointment._id} className="appointment-item">
              <span>{new Date(appointment.date).toLocaleDateString()}</span> -
              <span>{new Date(appointment.date).toLocaleTimeString()}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No appointments found.</p>
      )}
    </div>
  );
}

export default CheckAppointmentsScreen;
