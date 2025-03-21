const isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied." });
  }
  next();
};

const isDoctorOrAdmin = (req, res, next) => {
  if (!req.user || (req.user.role !== "admin" && req.user.role !== "doctor")) {
    return res.status(403).json({ message: "Access denied." });
  }
  next();
};
module.exports = { isAdmin, isDoctorOrAdmin };
