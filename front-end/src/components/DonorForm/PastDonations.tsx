import { collection, query, onSnapshot } from "firebase/firestore";
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
      )
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
            <p className="donationInfo">
              {pastDonation.data.IsAnon ? "Anonymous" : pastDonation.data.name}{" "}
              <i style={{fontWeight:"normal", fontStyle:"normal"}}>donated</i> ${pastDonation.data.paidAMT}
            </p>
          ))}
        </div>
      </div>

    </>
  );
}
export default PastDonations;
