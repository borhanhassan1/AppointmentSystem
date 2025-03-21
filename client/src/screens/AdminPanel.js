import React, { useContext, useEffect, useState } from "react";
import UserContext from "../context/userContext";
import AdminDashboard from "./AdminScreen";

const AdminPanel = () => {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user !== null) {
      setLoading(false);
    }
  }, [user]);

  if (loading) return <div className="loader">Loading...</div>;

  if (!user || user.role !== "admin") {
    return (
      <div className="not-allowed">
        🚫 You are not allowed to visit this page.
      </div>
    );
  }

  return <AdminDashboard />;
};

export default AdminPanel;
