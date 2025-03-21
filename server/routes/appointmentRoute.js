const express = require("express");
const mongoose = require("mongoose");
const Appointment = require("../models/Appointment");
const verifyToken = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/create", verifyToken, async (req, res) => {
  try {
    console.log("Received request to create appointment.");
    const { userId, date } = req.body;

    if (!userId || !date) {
      return res
        .status(400)
        .json({ message: "User ID and date are required." });
    }

    console.log("User ID:", userId);
    console.log("Raw Date:", date);

    const appointmentDate = new Date(date);
    if (isNaN(appointmentDate.getTime())) {
      return res.status(400).json({ message: "Invalid date format." });
    }

    console.log("Parsed Date:", appointmentDate.toISOString());

    const existingAppointment = await Appointment.findOne({
      date: appointmentDate,
    });
    if (existingAppointment) {
      return res
        .status(400)
        .json({ message: "This time slot is already booked." });
    }

    const newAppointment = new Appointment({
      userId: new mongoose.Types.ObjectId(userId),
      date: appointmentDate,
    });

    await newAppointment.save();

    res.status(201).json({
      message: "✅ Appointment booked successfully!",
      appointment: newAppointment,
    });
  } catch (error) {
    console.error("❌ Server Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});
router.get("/booked-slots", verifyToken, async (req, res) => {
  try {
    let { date } = req.query;
    console.log("Received date:", date);

    if (!date) {
      return res.status(400).json({ message: "Date is required." });
    }

    let appointmentDate = new Date(date);

    if (isNaN(appointmentDate.getTime())) {
      appointmentDate = new Date(`${date}T00:00:00.000Z`);
    }

    if (isNaN(appointmentDate.getTime())) {
      return res
        .status(400)
        .json({ message: "Invalid date format. Please use YYYY-MM-DD." });
    }

    appointmentDate.setHours(0, 0, 0, 0);
    console.log("Parsed date:", appointmentDate);

    const bookedAppointments = await Appointment.find({
      date: {
        $gte: appointmentDate,
        $lt: new Date(appointmentDate.getTime() + 86400000),
      },
    });

    const bookedSlots = bookedAppointments.map((appointment) => {
      return new Date(appointment.date).getHours();
    });

    res.json({ bookedSlots });
  } catch (error) {
    console.error("Error fetching booked slots:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const appointments = await Appointment.find({ userId }).sort({ date: 1 });
    console.log(userId);
    res.json({ appointments });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
