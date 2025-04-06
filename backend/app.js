process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  // Don't exit the process here for Railway
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Don't exit the process here for Railway
});

const express = require("express");
const cors = require("cors");
const connectDB = require("./mongodb");
const userRoutes = require("./userRoutes");
const dotenv = require("dotenv").config();  // to access environmental variables from .env file

connectDB();

const app = express();   // to make it executable
// app.use(cors);
app.use(cors({origin: process.env.CORS_ORIGIN, credentials: true }));

app.use(express.json());
app.use("/api/userRoutes", userRoutes);


// console.log(process.env.PORT);  
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports= app;
