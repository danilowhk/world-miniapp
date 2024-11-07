// server.js
const express = require("express");
const cors = require("cors");  // Import cors package
const connectDB = require("./config/db");
const userRoutes = require("./routes/users");
const lessonRoutes = require("./routes/lessons");
const roleRoutes = require("./routes/roles");

const app = express();
const PORT = process.env.PORT || 5000;

// // Allow requests from localhost:3000 (your frontend)
// const corsOptions = {
//   origin: "http://localhost:3000", // Allow frontend on localhost:3000
//   methods: "GET,POST,PUT,DELETE,PATCH",
//   allowedHeaders: "Content-Type,Authorization",
// };

// app.use(cors(corsOptions)); // Enable CORS with the specified options

// Enable CORS for all origins
app.use(cors()); // This will allow requests from any origin

app.use(express.json());

connectDB();

app.use("/api/users", userRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/roles", roleRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});