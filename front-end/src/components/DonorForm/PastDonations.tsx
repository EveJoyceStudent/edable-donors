import { collection, query, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../config/firebase";

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
      <div
        style={{
          border: "1px solid",
          borderRadius: "15px",
        }}
      >
        <h3>Past Donations</h3>

        {pastDonations.map((pastDonation: any) => (
          <p>
            {pastDonation.data.IsAnon ? "Anonymous" : pastDonation.data.name}{" "}
            donated ${pastDonation.data.paidAMT}
          </p>
        ))}
      </div>
    </>
  );
}
export default PastDonations;
