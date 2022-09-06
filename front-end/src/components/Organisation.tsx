import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import DonorForm from "./DonorForm";
import Button from "react-bootstrap/Button";

function Organisation() {
  let params = useParams();
  const [org, setOrg] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      const orgId = params.orgId || "";
      const docRef = doc(db, "Organisations", orgId);
      const docSnap = await getDoc(docRef);
      setOrg(docSnap.data());
    };
    fetchData().catch(console.error);
  }, [params.orgId]);

  return (
    //   these lines set up the format of the page
    <div>
      <h3 style={{ textAlign: "left", margin: "10px" }}>
        {org.name} Donation Page
      </h3>
      <Button variant="danger">
        <Link
          style={{
            textDecoration: "none",
            color: "black",
            fontSize: "20px",
          }}
          to={`/`}
        >
          <i>← Go Back</i>
        </Link>
      </Button>
      <DonorForm org={params.orgId} />
      {/* <div>
        <img src={org.img} alt={`${org.name}`} />
        <div>{org.name}</div>
        <Link to="/">Home</Link>
      </div> */}
    </div>
  );
}

export default Organisation;
