const express = require("express");
require("dotenv").config();
const colors = require("colors");
const connectDB = require("./config/db_config");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 4000;

// DB Connection

connectDB();

// Body Paraser

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    msg: " Welcome to ProCar Service",
  });
});

// User Routes

app.use("/api/user", require("./routes/userRoutes"));

// Car Service Route

app.use("/api/service", require("./routes/carServiceRoutes"));

// Admin Routes

app.use("/api/admin", require("./routes/adminRoutes"));

//Error Handler MiddleWare

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running ar PORT : ${PORT}`.bgBlue.black);
});
