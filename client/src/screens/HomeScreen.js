import React from "react";
import "../CSS/home.css";

function HomeScreen() {
  return (
    <div className="hero-container">
      <img
        src="https://onnmed.com/public/uploads/website/mainPage/slider/1_2024-02-28_01-58-09-000000_aboutus award.png"
        alt="Welcome to OnnMed"
        className="hero-image"
      />
      <div className="overlay">
        <h2 className="hero-title">WELCOME TO ONNMED</h2>
        <p className="hero-subtitle">ALWAYS HERE TO ASSIST YOU</p>
        <p className="hero-description">
          At Onnmed, your health is our priority. We make booking appointments
          with top doctors easier than ever!
        </p>
      </div>
    </div>
  );
}

export default HomeScreen;
