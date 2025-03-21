import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FiTrash2 } from "react-icons/fi";
import "../CSS/adminPanel.css";
import adminApi from "../api/adminApi";

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  useEffect(() => {
    fetchAppointments();
  }, []);
  const fetchAppointments = async () => {
    try {
      const { data } = await adminApi.getAppointments();
      setAppointments(data);
    } catch (error) {
      toast.error("Failed to load appointments");
    }
  };

  const handleDeleteAppointment = async (appointmentId) => {
    if (!window.confirm("Are you sure you want to delete this appointment?"))
      return;
    try {
      await adminApi.deleteAppointment(appointmentId);
      setAppointments(
        appointments.filter((appointment) => appointment._id !== appointmentId)
      );
      toast.success("Appointment deleted successfully");
    } catch (error) {
      toast.error("Failed to delete appointment");
    }
  };

  return (
    <div className="admin-dashboard">
      <h2 className="dashboard-title">Doctor Dashboard</h2>

      <div className="section">
        <h3>Appointments</h3>
        <div className="card-container">
          {appointments.length > 0 ? (
            appointments.map((appointment) => (
              <div key={appointment._id} className="appointment-card">
                <div className="appointment-info">
                  <h4>{appointment.userId?.username || "Unknown User"}</h4>
                  <p>
                    {new Date(appointment.date).toLocaleDateString()} -{" "}
                    {new Date(appointment.date).toLocaleTimeString()}
                  </p>
                </div>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteAppointment(appointment._id)}
                >
                  <FiTrash2 size={18} />
                </button>
              </div>
            ))
          ) : (
            <p className="empty-message">No appointments found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
