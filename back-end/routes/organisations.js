const router = require("express").Router();
const db = require("../config/db");

// get all orgs
router.get("/dashboard", (req, res) => {
  db.firestore()
    .collection("Organisations")
    .get()
    .then((snapshot) => {
      const allOrgs = snapshot.docs.map((doc) => doc);
      res.json(allOrgs);
    });
});
// get by id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const orgRef = db.firestore().collection("Organisations");
  try {
    orgRef
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          res.json(doc);
        } else {
          res.status(404).send("Organisation does not exist!");
        }
      });
  } catch (error) {
    res.status(500).send(error);
  }
});

//post org
router.post("/", async (req, res) => {
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

//update org
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, summary, activeStatus, ABN, phone, website, img, description } =
    req.body;
  const orgRef = db.firestore().collection("Organisations");
  try {
    const updatedOrg = await orgRef.doc(id).update({
      name,
      summary,
      activeStatus,
      ABN,
      phone,
      website,
      img,
      description,
    });
    res.send(updatedOrg);
  } catch (error) {
    res.send(error);
  }
});

//delete org
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const orgRef = db.firestore().collection("Organisations");
  try {
    const org = await orgRef.doc(id).delete();
    res.send(org);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
