import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import DonorForm from "./DonorForm";
import "../styling/Organisation.css";
import { Button, Card } from "react-bootstrap";

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
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 20,
      }}
    >
      <Card
        className="orgInfo">
        <h6 style={{ textAlign: "left", margin: "7px" }}>
          YOU"RE DONATING TOWARDS Edable SUPPORTING
        </h6>
        <Card.Title>{org.name}</Card.Title>
        <Card.Img variant="top" src={org.img} alt={`${org.name}`} />
        <Card.Body>
          <Card.Text>{org.description}</Card.Text>
        </Card.Body>
        <Link to="/">
          <Button variant="warning">Go back</Button>
        </Link>
      </Card>

      <DonorForm org={params.orgId} />

    </div>
  );
}

export default Organisation;
