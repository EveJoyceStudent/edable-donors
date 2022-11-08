const router = require("express").Router();
const db = require("../config/db");
const admin = require("firebase-admin");
const e = require("express");

router.post("/general", async (req, res) => {
  const data = await req.body;
  try {
    await db.firestore().runTransaction(async (transaction) => {
      const newDonationRef = db
        .firestore()
        .collection(`Organisations/${data.orgID}/GeneralDonations`);
      const newDonationDoc = newDonationRef.doc();
      transaction.set(newDonationDoc, {
        donorPublicName: data.donorPublicName,
        amount: data.amount,
        IsRefunded: data.IsRefunded,
        IsSubscribed: data.IsSubscribed,
        comment: data.comment,
        donationDate: admin.firestore.Timestamp.fromDate(new Date()),
      });
      const donationID = newDonationDoc._path.segments[3];

      transaction.set(
        db
          .firestore()
          .collection(
            `Organisations/${data.orgID}/GeneralDonations/${donationID}/Private`
          )
          .doc("Private"),
        {
          paypalTransactionId: data.paypalTransactionId,
          name: data.name,
          email: data.email,
          phoneNumber: data.phoneNumber,
          mailingAddress: data.mailingAddress,
          IsAnon: data.IsAnon,
          agreeToContact: data.agreeToContact,
          howHeard: data.howHeard,
          howHeardOther: data.howHeardOther,
        }
      );
      transaction.update(db.firestore().doc(`Organisations/${data.orgID}`), {
        totalDonationCount: admin.firestore.FieldValue.increment(1),
        totalGeneralDonationsCount: admin.firestore.FieldValue.increment(1),
        totalDonationsValue: admin.firestore.FieldValue.increment(
          Number(data.totalDonationsValue)
        ),
        totalGeneralDonationsValue: admin.firestore.FieldValue.increment(
          Number(data.totalGeneralDonationsValue)
        ),
      });
    });
    res.status(200).send({
      message: "Success",
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/item", async (req, res) => {
  const data = await req.body;
  try {
    await db.firestore().runTransaction(async (transaction) => {
      const newDonationRef = db
        .firestore()
        .collection(
          `Organisations/${data.orgID}/Items/${data.itemID}/ItemsDonations`
        );
      const newDonationDoc = newDonationRef.doc();
      transaction.set(newDonationDoc, {
        donorPublicName: data.donorPublicName,
        amount: data.amount,
        IsRefunded: data.IsRefunded,
        comment: data.comment,
        donationDate: admin.firestore.Timestamp.fromDate(new Date()),
      });
      const donationID = newDonationDoc._path.segments[5];

      transaction.set(
        db
          .firestore()
          .collection(
            `Organisations/${data.orgID}/Items/${data.itemID}/ItemsDonations/${donationID}/Private`
          )
          .doc("Private"),
        {
          paypalTransactionId: data.paypalTransactionId,
          name: data.name,
          email: data.email,
          phoneNumber: data.phoneNumber,
          mailingAddress: data.mailingAddress,
          IsAnon: data.IsAnon,
          agreeToContact: data.agreeToContact,
          howHeard: data.howHeard,
          howHeardOther: data.howHeardOther,
        }
      );
      var date;
      if (
        data.initialPrice <= data.totalItemDonations ||
        data.initialPrice == data.totalItemDonations
      ) {
        date = admin.firestore.Timestamp.fromDate(new Date());
      } else {
        date = null;
      }

      transaction.update(
        db.firestore().doc(`Organisations/${data.orgID}/Items/${data.itemID}`),
        {
          totalDonationCount: admin.firestore.FieldValue.increment(1),
          totalDonationsValue: admin.firestore.FieldValue.increment(
            Number(data.totalDonationsValue)
          ),
          activeStatus: data.activeStatus,
          dateCompleted: date,
        }
      );
      transaction.update(db.firestore().doc(`Organisations/${data.orgID}`), {
        totalDonationCount: admin.firestore.FieldValue.increment(1),
        totalGeneralDonationsCount: admin.firestore.FieldValue.increment(1),
        totalDonationsValue: admin.firestore.FieldValue.increment(
          Number(data.totalDonationsValue)
        ),
        totalGeneralDonationsValue: admin.firestore.FieldValue.increment(
          Number(data.totalDonationsValue)
        ),
      });
    });
    res.status(200).send({
      message: "success",
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/volunteer", async (req, res) => {
  data = await req.body;
  try {
    const volRef = db
      .firestore()
      .collection(`Organisations/${data.orgID}/VolunteerDonations`);
    const volDoc = volRef.doc();
    await volDoc.set({
      volunteerName: data.volunteerName,
      volunteerPhone: data.volunteerPhone,
      volunteerEmail: data.volunteerEmail,
      volunteerOrgName: data.volunteerOrgName,
      volunteerDOB: data.volunteerDOB,
      volunteerAmount: data.volunteerAmount,
      volunteerHours: data.volunteerHours,
      volunteerPostcode: data.volunteerPostcode,
      volunteerComment: data.volunteerComment,
      volunteerHowHeard: data.volunteerHowHeard,
      volunteerHowHeardOther: data.volunteerHowHeardOther,
      howContribute: data.howContribute,
      Skills: data.Skills,
      Monday: data.Monday,
      Tuesday: data.Tuesday,
      Wednesday: data.Wednesday,
      Thursday: data.Thursday,
      Friday: data.Friday,
      Saturday: data.Saturday,
      Sunday: data.Sunday,
      creationDate: admin.firestore.Timestamp.fromDate(new Date()),
    });
  } catch (e) {
    res.status(400).send(e);
  }
});
module.exports = router;
