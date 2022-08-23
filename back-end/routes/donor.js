const router = require("express").Router();
const db = require("../config/db");

const donorRef = db.firestore().collection("Donors");

router.get("/", (req, res) => {
  donorRef.get().then((snapshot) => {
    const allDonors = snapshot.docs.map(
      (doc) => (doc = { id: doc.id, donor: doc.data() })
    );
    res.json(allDonors);
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  try {
    donorRef
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          res.json((doc = { id: doc.id, donor: doc.data() }));
        } else {
          res.status(404).send("Donor does not exist!");
        }
      });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/", async (req, res) => {
  const { name, email, mailingAddress, isAnon, agreeToContact, phone } =
    req.body;

  if (
    req.body["name"] == undefined ||
    req.body["email"] == undefined ||
    req.body["mailingAddress"] == undefined ||
    req.body["isAnon"] == undefined ||
    req.body["agreeToContact"] == undefined ||
    req.body["phone"] == undefined
  ) {
    res.send("Donor needs One or More values");
  } else {
    try {
      const newDonor = await donorRef.add({
        name,
        email,
        mailingAddress,
        isAnon,
        agreeToContact,
        phone,
      });
      res.send(newDonor);
    } catch (error) {
      res.send(error);
    }
  }
});

module.exports = router;
