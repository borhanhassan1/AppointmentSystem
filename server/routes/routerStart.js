module.exports = (app) => {
  app.use("/api/user", require("./userRoute"));
  app.use("/api/appointment", require("./appointmentRoute"));
  app.use("/api/admin", require("./adminRouter"));
};
