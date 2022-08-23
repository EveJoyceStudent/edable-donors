const router = require("express").Router();
const db = require("../config/db");

const orgRef = db.firestore().collection("Organisations");

// get all orgs
router.get("/dashboard", (req, res) => {
  orgRef.get().then((snapshot) => {
    const allOrgs = snapshot.docs.map(
      (doc) => (doc = { id: doc.id, orgs: doc.data() })
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
          res.json((doc = { id: doc.id, orgs: doc.data() }));
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
  const newOrg = ({
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
  } = req.body);

  if (
    newOrg["name"] == undefined ||
    newOrg["summary"] == undefined ||
    newOrg["description"] == undefined ||
    newOrg["activeStatus"] == undefined ||
    newOrg["ABN"] == undefined ||
    newOrg["phone"] == undefined ||
    newOrg["website"] == undefined ||
    newOrg["img"] == undefined ||
    newOrg["totalDonationItems"] == undefined ||
    newOrg["totalDonations"] == undefined
  ) {
    res.send("Organisation needs One or More values");
  } else {
    try {
      const newwOrg = await orgRef.add({
        newOrg,
      });
      res.send(newwOrg);
    } catch (error) {
      res.send(error);
    }
  }
});

//update org
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const newOrg = ({
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
  } = req.body);
  if (
    newOrg["name"] == undefined ||
    newOrg["summary"] == undefined ||
    newOrg["description"] == undefined ||
    newOrg["activeStatus"] == undefined ||
    newOrg["ABN"] == undefined ||
    newOrg["phone"] == undefined ||
    newOrg["website"] == undefined ||
    newOrg["img"] == undefined ||
    newOrg["totalDonationItems"] == undefined ||
    newOrg["totalDonations"] == undefined
  ) {
    res.send("Organisation needs One or More values");
  } else {
    try {
      const updatedOrg = await orgRef.doc(id).update({
        newOrg,
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
