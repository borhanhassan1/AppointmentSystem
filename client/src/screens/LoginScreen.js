import React, { useState, useRef } from "react";
import Input from "../components/Input";
import { toast } from "react-toastify";
import authApi from "../api/auth";
import usersApi from "../api/userApi";
import ReCAPTCHA from "react-google-recaptcha";
import { Link } from "react-router-dom";
function LoginScreen(props) {
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [captchaToken, setcaptchaToken] = useState(null);
  const recaptchaRef = useRef(null);

  function onChange(value) {
    setcaptchaToken(value);
    setCaptchaVerified(true);
  }

  const resetCaptcha = () => {
    if (recaptchaRef.current) {
      recaptchaRef.current.reset();
      setCaptchaVerified(false);
      setcaptchaToken(null);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await usersApi.loginUser({
        username: data.username,
        password: data.password,
        captchaToken,
      });
      console.log(res);
      authApi.setToken(res.data.token);
      toast.info("all good");
      window.location = "/";
    } catch (err) {
      resetCaptcha();
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
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey="6Le_PfoqAAAAACMWcnYfx7Gs2raBWnrX5UOm85UX"
          onChange={onChange}
        />
        <button
          type="submit"
          className="btn btn-primary"
          disabled={!captchaVerified}
        >
          Log in
        </button>
        <p className="mt-3">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </form>
    </div>
  );
}

export default LoginScreen;
