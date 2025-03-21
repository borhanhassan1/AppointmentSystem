const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { isAdmin, isDoctorOrAdmin } = require("../middlewares/adminMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");

router.delete("/delete-user/:id", authMiddleware, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    await Appointment.deleteMany({ userId: id });
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res.json({ message: "User deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

const Appointment = require("../models/Appointment");

router.delete(
  "/delete-appointment/:id",
  authMiddleware,
  isDoctorOrAdmin,
  async (req, res) => {
    try {
      const { id } = req.params;
      const deletedAppointment = await Appointment.findByIdAndDelete(id);

      if (!deletedAppointment) {
        return res.status(404).json({ message: "Appointment not found." });
      }

      res.json({ message: "Appointment deleted successfully." });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);

router.get("/users", authMiddleware, isAdmin, async (req, res) => {
  try {
    const users = await User.find({ role: { $ne: "admin" } }, "-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get(
  "/appointments",
  authMiddleware,
  isDoctorOrAdmin,
  async (req, res) => {
    try {
      const appointments = await Appointment.find().populate(
        "userId",
        "username"
      );
      res.json(appointments);
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

module.exports = router;
