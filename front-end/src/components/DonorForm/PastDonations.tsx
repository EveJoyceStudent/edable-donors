import { collection, query, onSnapshot, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../config/firebase";
import "./PastDonations.css";

function PastDonations() {
  let params = useParams();
  const [pastDonations, setPastDonations] = useState<any>([]);

  useEffect(() => {
    const orgID = params.orgId || "";
    const q = query(
      collection(
        db,
        `Organisations/${orgID}/GeneralDonations/Summary/Donations`
      ),
      where("IsRefunded", "==", false)
    );
    onSnapshot(q, (querySnapshot) => {
      setPastDonations(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);
  return (
    <>
      <div className="donationContainer">
        <div style={{padding:"40px"}}>
          <h3 className="donationTitle">Past Donations</h3>
        {pastDonations.map((pastDonation: any) => (
          <p key={pastDonation.id}>
            {pastDonation.data.donor.IsAnon
              ? "Anonymous"
              : pastDonation.data.donor.name}{" "}
            donated ${pastDonation.data.amount}
          </p>
        ))}
      </div>

    </>
  );
}
export default PastDonations;
