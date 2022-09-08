import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Button, Card, ProgressBar } from "react-bootstrap";
import DonorForm from "../DonorForm/DonorForm";

function ItemPage() {
  let params = useParams();
  const [item, setItem] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      const itemID = params.itemID || "";
      const orgID = params.orgID || "";

      const docRef = doc(db, `Organisations/${orgID}/Items`, itemID);
      const docSnap = await getDoc(docRef);
      setItem(docSnap.data());
    };
    fetchData().catch(console.error);
  }, [params.itemID, params.orgID]);

  const [org, setOrg] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      const orgId = params.orgID || "";
      const docRef = doc(db, "Organisations", orgId);
      const docSnap = await getDoc(docRef);
      setOrg(docSnap.data());
    };
    fetchData().catch(console.error);
  }, [params.orgID]);

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card
          className="orgInfo">
          <h6 style={{ textAlign: "left", margin: "7px" }}>
            <i>YOUR PARTNERSHIP MEANS THE WORLD TO US</i>
          </h6>
          <Card.Title>{org.name}</Card.Title>
          <Card.Subtitle>would love your support for<br /><em>{item.name}</em></Card.Subtitle>
          <Card.Img variant="top" src={item.img} alt={`${item.name}`} />
          <Card.Body className="pt-0 px-0">
            <Card.Text className="mb-0">
              ${item.totalDonations || 0} of $
              {item.initialPrice}
            </Card.Text>
            <ProgressBar
              className="mb-3"
              striped
              variant="danger"
              now={
                item.totalDonations ? (item.totalDonations / item.initialPrice) * 100 : 0
              }
              label={`${Math.round(
                (item.totalDonations / item.initialPrice) * 100
              )}%`}
            />
            <Card.Text>{item.description}</Card.Text>
            <Card.Text> Check out the <a href={org.website}>{`${org.name}`} website</a></Card.Text>
          </Card.Body>
          <Link to="/">
            <Button variant="warning">Go back</Button>
          </Link>
        </Card>

        <DonorForm org={params.orgID} item={params.itemID} itemAmount={Math.round((item.initialPrice - (item.totalDonations || 0)+Number.EPSILON)*100)/100} />
      </div>
    </>
  );
}

export default ItemPage;
