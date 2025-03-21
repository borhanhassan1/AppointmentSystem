import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FiTrash2 } from "react-icons/fi";
import "../CSS/adminPanel.css";
import adminApi from "../api/adminApi";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchUsers();
    fetchAppointments();
  }, [users]);

  const fetchUsers = async () => {
    try {
      const { data } = await adminApi.getUsers();
      setUsers(data);
    } catch (error) {
      toast.error("Failed to load users");
    }
  };

  const fetchAppointments = async () => {
    try {
      const { data } = await adminApi.getAppointments();
      setAppointments(data);
    } catch (error) {
      toast.error("Failed to load appointments");
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await adminApi.deleteUser(userId);
      setUsers(users.filter((user) => user._id !== userId));
      toast.success("User deleted successfully");
    } catch (error) {
      toast.error("Failed to delete user");
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
      <h2 className="dashboard-title">Admin Dashboard</h2>

      <div className="section">
        <h3>Users</h3>
        <div className="card-container">
          {users.length > 0 ? (
            users.map((user) => (
              <div key={user._id} className="user-card">
                <div className="user-info">
                  <h4>
                    {user.username} - {user.role}
                  </h4>
                </div>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteUser(user._id)}
                >
                  <FiTrash2 size={18} />
                </button>
              </div>
            ))
          ) : (
            <p className="empty-message">No users found.</p>
          )}
        </div>
      </div>

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

export default AdminDashboard;
