const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const userRoute = require("./API/v1/routes/userRoute");
const clubRoute = require("./API/v1/routes/clubRoute");
dotenv.config();
app.use(express.json());
app.use(cors());

app.use("/api/v1", userRoute);
app.use("/api/v1", clubRoute);

module.exports = app;
