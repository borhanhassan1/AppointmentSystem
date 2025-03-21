import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/userContext";
import authApi from "../api/auth";
import "../CSS/navbar.css";

function Navbar() {
  const { user, setUser } = useContext(UserContext);

  const handleLogout = () => {
    setUser(null);
    authApi.deleteToken();
  };

  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-white border-bottom">
      <Link className="navbar-brand ml-2 font-weight-bold" to="/">
        <span className="burgundy">Onn</span>
        <span className="orange">Med</span>
      </Link>

      <div className="nav-links">
        {user?.role === "patient" && (
          <>
            <Link to="/appointment" className="appointment-btn">
              Make an Appointment
            </Link>
            <Link to="/checkAppointments" className="appointment-btn">
              My Appointments
            </Link>
          </>
        )}

        {user?.role === "doctor" && (
          <Link to="/doctor" className="appointment-btn">
            My Appointments
          </Link>
        )}

        {user?.role === "admin" && (
          <Link to="/admin" className="appointment-btn">
            Admin Dashboard
          </Link>
        )}
      </div>

      <div className="ml-auto">
        {user ? (
          <>
            <label className="username-label">Hello, {user.username}</label>
            <button className="btn btn-outline-danger" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <Link className="btn btn-outline-primary" to="/login">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
