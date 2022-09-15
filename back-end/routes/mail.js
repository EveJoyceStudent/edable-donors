const router = require("express").Router();
const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const path = require("path");
const fs = require("fs");

const dotenv = require("dotenv");
dotenv.config();

router.post("/", (req, res) => {
  const date = new Date();
  const filePath = path.join(__dirname, "../pages/emailTemplate.html");
  const source = fs.readFileSync(filePath, "utf-8").toString();
  const template = handlebars.compile(source);
  const replacements = {
    receiptNum: Math.floor(date.getTime() / 1000),
    orgName: "Dummy Name",
    donationDate: date.toDateString(),
    name: "IDK",
    donorEmail: "dummy@gmail.com",
    amount: "$10",
    donationType: "One Time",
  };

  const htmlMail = template(replacements);

  const OAuth2_client = new OAuth2(
    process.env.clientId,
    process.env.clientSecret,
    process.env.redirectURL
  );

  OAuth2_client.setCredentials({ refresh_token: process.env.refreshToken });

  const accessToken = OAuth2_client.getAccessToken();

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.user,
      clientId: process.env.clientId,
      clientSecret: process.env.clientSecret,
      refreshToken: process.env.refreshToken,
      accessToken: accessToken,
    },
  });

  const mail_options = {
    from: `Bot Mailer <${process.env.user}>`,
    to: "singh.agam0009@gmail.com",
    subject: "Donation Receipt",
    html: htmlMail,
  };

  transport.sendMail(mail_options, function (error, result) {
    if (error) {
      console.log("Error: ", error);
    } else {
      console.log("Success: ", result);
    }
    transport.close();
  });
  res.json("bye");
});

module.exports = router;
