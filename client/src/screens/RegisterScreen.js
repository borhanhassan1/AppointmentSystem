import React, { useState } from "react";
import Input from "../components/Input";
import { toast } from "react-toastify";
import authApi from "../api/auth";
import usersApi from "../api/userApi";
function RegisterScreen(props) {
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await usersApi.createUser(data);
      console.log(res);
      authApi.setToken(res.data.token);
      toast.info("all good");
      window.location = "/";
    } catch (err) {
      toast.error(
        err.response?.data.message || "An unexpected error occurred."
      );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <Input
          labelName="username"
          type="text"
          handleChange={handleChange}
          value={data.username}
        />
        <Input
          labelName="password"
          type="password"
          handleChange={handleChange}
          value={data.password}
        />
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterScreen;
