// const functions = require('firebase-functions')
// // importing packages
// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");

// // express config
// const app = express();
// dotenv.config();

// // imports
// const mail = require("./routes/mail");
// const donations = require("./routes/donations");
// // Middlewares

// const isDev = process.env.NODE_ENV === "development";
// const allowedOriginsFinal = isDev
//   ? process.env.allowedOriginsDev
//   : process.env.allowedOriginsProd;

// // cors config
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (allowedOriginsFinal.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
// };

// app.use(cors(corsOptions));

// app.use(express.json());
// app.use("/mail", mail);
// app.use("/donations", donations);

// app.get("/", (req, res) => {
//   res.send("Hello EdAble!");
// });

// // server start
// app.listen(process.env.PORT || 8080, () => {
//   console.log(`Server started on port ${process.env.PORT}`);
// });

// module.exports = app;

// exports.app = functions.https.onRequest(app);