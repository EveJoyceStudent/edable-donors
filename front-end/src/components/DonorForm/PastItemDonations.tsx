import {
  collection,
  query,
  onSnapshot,
  where,
  limit,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../config/firebase";
import "./PastDonations.css";

function PastDonations() {
  let params = useParams();
  const [pastDonations, setPastDonations] = useState<any>([]);

  useEffect(() => {
    const orgID = params.orgID || "";
    const itemID = params.itemID || "";
    const q = query(
      collection(db, `Organisations/${orgID}/Items/${itemID}/ItemsDonations`),
      where("IsRefunded", "==", false),
      limit(10)
    );
    onSnapshot(q, (querySnapshot) => {
      setPastDonations(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
          timestamp: doc.data().donationDate.toMillis(),
        }))
      );
    });
  }, []);

  const pastDescending = [...pastDonations].sort(
    (a, b) => b.timestamp - a.timestamp
  );
  const pastDescendin = pastDescending.slice(0, 10);

  return (
    <div className="donationContainer">
      <div className="conPadding">
        <h3 className="donationTitle">Past Donations</h3>
        {pastDescendin.map((pastDonation: any) => (
          <p key={pastDonation.id} className="donationInfo">
            {pastDonation.data.donorPublicName}&nbsp;
            <i style={{ fontWeight: "normal", fontStyle: "normal" }}>donated</i>
            &nbsp; ${pastDonation.data.amount}
            <i style={{ fontWeight: "normal", fontStyle: "normal" }}>
              {" "}
              &nbsp;towards this item
            </i>
          </p>
        ))}
        {pastDescendin.length == 0 && (
          <p className="donationInfo">
            <i style={{ fontWeight: "normal" }}>Be the first to donate!</i>
          </p>
        )}
      </div>
    </div>
  );
}

export default PastDonations;
