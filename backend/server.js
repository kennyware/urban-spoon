const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const { errorHandler } = require("./middleware/errorMiddleware");
const { connectDB } = require("./config/db");
const path = require("path");

const port = process.env.PORT || 5000;

const app = express();

// Middleware to accept body data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect to MongoDB database
connectDB();

app.use("/api/boards", require("./routes/boardRoutes"));
app.use("/api/tasks", require("./routes/tasksRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

// Error handling middleware
app.use(errorHandler);

if (process.env.NODE_ENV === "production") {
  // Set static folder
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
