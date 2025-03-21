import React, { useState, useEffect } from "react";
import RegisterScreen from "./screens/RegisterScreen";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import authApi from "./api/auth";
import UserContext from "./context/userContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import AppointmentScreen from "./screens/AppointmentScreen";
import CheckAppointmentsScreen from "./screens/CheckAppointmentsScreen";
import AdminPanel from "./screens/AdminPanel";
import DoctorDashboard from "./screens/DoctorScreen";

function App() {
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    setUser(authApi.getUser() || null);
    setUserLoading(false);
  }, []);

  return (
    <BrowserRouter>
      <UserContext.Provider
        value={{ user, setUser, userLoading, setUserLoading }}
      >
        <ToastContainer />

        <Navbar />
        <Routes>
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/" element={<HomeScreen />} />
          <Route path="login" element={<LoginScreen />} />
          <Route path="/appointment" element={<AppointmentScreen />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/doctor" element={<DoctorDashboard />} />

          <Route
            path="/checkAppointments"
            element={<CheckAppointmentsScreen />}
          />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
