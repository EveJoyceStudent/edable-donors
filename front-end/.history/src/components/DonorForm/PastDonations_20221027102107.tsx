import {
  collection,
  query,
  onSnapshot,
  orderBy,
  limit,
  where,
} from "firebase/firestore";
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
      collection(db, `Organisations/${orgID}/GeneralDonations`),
      where("IsRefunded", "==", false),
      orderBy("donationDate", "desc"),
      limit(10)
    );
    onSnapshot(q, (querySnapshot) => {
      setPastDonations(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    }, (e)=>console.log("error", e));
  }, []);

  return (
    <div className="donationContainer">
      <div className="conPadding">
        <h3 className="donationTitle">Past Donations</h3>
        {pastDonations.map((pastDonation: any) => (
          <p key={pastDonation.id} className="donationInfo">
            {pastDonation.data.donorPublicName}&nbsp;
            <i style={{ fontWeight: "normal", fontStyle: "normal" }}>donated</i>
            &nbsp; ${pastDonation.data.amount}
          </p>
        ))}
        {pastDonations.length == 0 && (
          <p className="donationInfo">
            <i style={{ fontWeight: "normal" }}>Be the first to donate!</i>
          </p>
        )}
      </div>
    </div>
  );
}

export default PastDonations;
