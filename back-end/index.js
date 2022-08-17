// importing packages
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// config
const app = express();
dotenv.config();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes

// server start
app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
