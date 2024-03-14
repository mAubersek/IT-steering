const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/authRoute");
const PORT = process.env.PORT || 4000;
const dbURI = "mongodb://127.0.0.1/ITSteeringAppDB";
mongoose
    .connect(dbURI, {
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB is connected successfully"))
    .catch((err) => console.error(err));

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

app.use(
    cors({
        origin: ["http://localhost:4000"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

app.use(cookieParser());

app.use(express.json());

app.use("/", authRoute);
