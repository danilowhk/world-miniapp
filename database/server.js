// server.js
const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/users");
const lessonRoutes = require("./routes/lessons");
const roleRoutes = require("./routes/roles");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

connectDB();

app.use("/api/users", userRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/roles", roleRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
