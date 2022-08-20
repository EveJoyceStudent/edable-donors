// importing packages
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// express config
const app = express();
dotenv.config();

// imports
const orgs = require("./routes/organisations");

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/organisation", orgs);

app.get("/", (req, res) => {
  res.send("This is the backend of the Edable Donors system !!!");
});

// server start
app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});

module.exports = app;
