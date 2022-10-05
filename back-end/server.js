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
const allowedOriginsDev = ["http://localhost:3000"];
const allowedOriginsProd = [
  "https://edable-donor.azurewebsites.net",
  "https://edable-donor-test.azurewebsites.net",
];
const isDev = process.env.NODE_ENV === "development";
const allowedOriginsFinal = isDev ? allowedOriginsDev : allowedOriginsProd;

// cors config
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOriginsFinal.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

app.use(express.json());
app.use("/mail", mail);

app.get("/", (req, res) => {
  res.send("Hello Edable!");
});

// server start
app.listen(process.env.PORT || 8080, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});

module.exports = app;
