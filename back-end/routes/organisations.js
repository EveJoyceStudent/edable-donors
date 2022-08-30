const router = require("express").Router();
const db = require("../config/db");

const orgRef = db.firestore().collection("Organisations");

// get all orgs
router.get("/dashboard", (req, res) => {
  orgRef.get().then((snapshot) => {
    const allOrgs = snapshot.docs.map(
      (doc) => (doc = { id: doc.id, org: doc.data() })
    );
    res.json(allOrgs);
  });
});
// get by id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  try {
    orgRef
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          res.json((doc = { id: doc.id, org: doc.data() }));
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
  const {
    name,
    summary,
    description,
    activeStatus,
    ABN,
    phone,
    website,
    img,
    totalDonationItems,
    totalDonations,
  } = req.body;

  if (
    req.body["name"] == undefined ||
    req.body["summary"] == undefined ||
    req.body["description"] == undefined ||
    req.body["activeStatus"] == undefined ||
    req.body["ABN"] == undefined ||
    req.body["phone"] == undefined ||
    req.body["website"] == undefined ||
    req.body["img"] == undefined
  ) {
    res.send("Organisation needs One or More values");
  } else {
    try {
      const newOrg = await orgRef.add({
        name,
        summary,
        description,
        activeStatus,
        ABN,
        phone,
        website,
        img,
        totalDonationItems,
        totalDonations,
      });
      res.send(newOrg);
    } catch (error) {
      res.send(error);
    }
  }
});

//update org
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const {
    name,
    summary,
    description,
    activeStatus,
    ABN,
    phone,
    website,
    img,
    totalDonationItems,
    totalDonations,
  } = req.body;

  if (
    req.body["name"] == undefined ||
    req.body["summary"] == undefined ||
    req.body["description"] == undefined ||
    req.body["activeStatus"] == undefined ||
    req.body["ABN"] == undefined ||
    req.body["phone"] == undefined ||
    req.body["website"] == undefined ||
    req.body["img"] == undefined
  ) {
    res.send("Organisation needs One or More values");
  } else {
    try {
      const updatedOrg = await orgRef.doc(id).update({
        name,
        summary,
        description,
        activeStatus,
        ABN,
        phone,
        website,
        img,
        totalDonationItems,
        totalDonations,
      });
      res.send(updatedOrg);
    } catch (error) {
      res.send(error);
    }
  }
});

//delete org
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const org = await orgRef.doc(id).delete();
    res.send(org);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
