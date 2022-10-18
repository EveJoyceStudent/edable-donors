const router = require("express").Router();
const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const path = require("path");
const fs = require("fs");

const dotenv = require("dotenv");
dotenv.config();

router.post("/general", (req, res) => {
  const data = req.body;
  const date = new Date();
  let type = "";
  const filePath = path.join(__dirname, "../pages/emailTemplate.html");
  const source = fs.readFileSync(filePath, "utf-8").toString();
  const template = handlebars.compile(source);
  if (data.donationType == false) {
    type += "One Time";
  } else {
    type += "Monthly";
  }
  const replacements = {
    orgName: data.orgName,
    donationDate: date.toDateString(),
    name: data.name,
    amount: data.amount,
    type: type,
    paypalTransactionId: data.paypalTransactionId,
    email: data.donorEmail,
    phoneNumber: data.phoneNumber
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
    to: data.donorEmail,
    subject: "Donation Receipt",
    html: htmlMail,
    attachments: [
      {
        filename: "logo.jpg",
        path: `${__dirname}/../assets/logo.png`,
        cid: "logo1",
      },
    ],
  };

  transport.sendMail(mail_options, function (error, result) {
    if (error) {
      console.log("Error: ", error);
    } else {
      console.log("Success: ", result);
    }
    transport.close();
  });
  console.log(data);
  res.json(data);
});

router.post("/item", (req, res) => {
  const data = req.body;
  const date = new Date();
  const filePath = path.join(__dirname, "../pages/emailTemplateItem.html");
  const source = fs.readFileSync(filePath, "utf-8").toString();
  const template = handlebars.compile(source);
  const replacements = {
    itemOrgName: data.itemOrgName,
    donationDate: date.toDateString(),
    name: data.name,
    amount: data.amount,
    itemName: data.itemName,
    paypalTransactionId: data.paypalTransactionId,
    phoneNumber: data.phoneNumber,
    email: data.donorEmail
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
    to: data.donorEmail,
    subject: "Donation Receipt",
    html: htmlMail,
    attachments: [
      {
        filename: "logo.jpg",
        path: `${__dirname}/../assets/logo.png`,
        cid: "logo1",
      },
    ],
  };

  transport.sendMail(mail_options, function (error, result) {
    if (error) {
      console.log("Error: ", error);
    } else {
      console.log("Success: ", result);
    }
    transport.close();
  });
  console.log(data);
  res.json(data);
});

router.post("/volunteer-info", (req, res) => {
  const data = req.body;
  const date = new Date();
  const filePath = path.join(__dirname, "../pages/emailTemplateVolunteerInfo.html");
  const source = fs.readFileSync(filePath, "utf-8").toString();
  const template = handlebars.compile(source);
  let days = [];
  if(data.monday){
    days.push("Monday");
  }
  if(data.tuesday){
    days.push("Tuesday");
  }
  if(data.wednesday){
    days.push("Wednesday");
  }
  if(data.thursday){
    days.push("Thursday");
  }
  if(data.friday){
    days.push("Friday");
  }
  if(data.saturday){
    days.push("Saturday");
  }
  if(data.sunday){
    days.push("Sunday");
  }
  const replacements = {
    orgName: data.orgName,
    donationDate: date.toDateString(),
    name: data.name,
    organisationFlag: data.organisationFlag,
    organisationName: data.organisationName,
    numVolunteers: data.numVolunteers,
    individualFlag: !(data.organisationFlag),
    dob:data.dob,
    phone:data.phone,
    email:data.email,
    postcode:data.postcode,
    hours:data.hours,
    availablity:days,

    howContribute:data.howContribute,
    skills:data.skills,
    comment:data.comment,
    howHeard:data.howHeard,
    howHeardOther:data.howHeardOther,
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
    to: "103596586@student.swin.edu.au",
    subject: "New Volunteer",
    html: htmlMail,
    attachments: [
      {
        filename: "logo.jpg",
        path: `${__dirname}/../assets/logo.png`,
        cid: "logo1",
      },
    ],
  };

  transport.sendMail(mail_options, function (error, result) {
    if (error) {
      console.log("Error: ", error);
    } else {
      console.log("Success: ", result);
    }
    transport.close();
  });
  console.log(data);
  res.json(data);
});

module.exports = router;
