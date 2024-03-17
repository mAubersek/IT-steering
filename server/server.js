const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require('path');
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;
const dbURI = "mongodb://127.0.0.1/ITSteeringAppDB";

// Middleware
app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json());

// API Routes
const appRoute = require("./Routes/appRoute");
app.use("/", appRoute);

// Serve static files
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

// Catch-all route to serve React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

// Database Connection
mongoose
    .connect(dbURI)
    .then(() => console.log("MongoDB is connected successfully"))
    .catch((err) => console.error(err));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
