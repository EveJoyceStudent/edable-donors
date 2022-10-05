// importing packages
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// express config
const app = express();
dotenv.config();

// imports
const mail = require("./routes/mail");

// Middlewares
app.use(
  cors({
    origin: [
      "https://edable-donor.azurewebsites.net",
      "https://edable-donor-test.azurewebsites.net",
      "http://localhost:3000",
    ],
  })
);
app.use(express.json());
app.use("/mail", mail);

app.get("/", (req, res) => {
  res.send("This is the backend of the Edable Donors system !!!");
});

// server start
app.listen(process.env.PORT || 8080, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});

module.exports = app;
