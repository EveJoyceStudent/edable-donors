// importing packages
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./config/db");

// express config
const app = express();
dotenv.config();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes

app.get("/", (req, res) => {
  res.send("This is the backend of the Edable Donors system !!!");
});

// get all orgs
app.get("/all", (req, res) => {
  db.firestore()
    .collection("Organisations")
    .get()
    .then((snapshot) => {
      const allOrgs = snapshot.docs.map((doc) => doc.data());
      res.send(allOrgs);
    });
});
//post org
app.post("/add", async (req, res) => {
  const { name, summary, activeStatus, ABN, phone, website, img, description } =
    req.body;
  const orgRef = db.firestore().collection("Organisations");
  try {
    const newOrg = await orgRef.add({
      name,
      summary,
      activeStatus,
      ABN,
      phone,
      website,
      img,
      description,
    });
    res.send(newOrg);
  } catch (error) {
    res.send(error);
  }
});

//delete org
app.post('/delete-org', async(req, res) => {
  const {name} = req.body;
  await firebase.firestore()
  .collection('Organisations')
  .where('name', "==", name)
  .delete()
  .then((ref) => {
      res.json(ref.data());
  });
});


// server start
app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});

module.exports = app;
