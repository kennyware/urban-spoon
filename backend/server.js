const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const { errorHandler } = require("./middleware/errorMiddleware");
const { connectDB } = require("./config/db");

const port = process.env.PORT || 5000;

const app = express();

// Middleware to accept body data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect to MongoDB database
connectDB();

app.use("/api/boards", require("./routes/tasksRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

// Error handling middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
