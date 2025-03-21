const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config(); // Load environment variables from .env

const app = express();

connectDB();

app.use(
  cors({
   origin: "https://appointment-system-7oh3.vercel.app",
   methods: ["GET", "POST", "PUT", "DELETE"],
   allowedHeaders: ["Content-Type", "Authorization"]
    credentials: true,
  })
);

app.use(express.json());

require("./routes/routerStart")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
