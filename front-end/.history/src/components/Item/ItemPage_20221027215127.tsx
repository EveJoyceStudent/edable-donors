import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import {
  Button,
  Card,
  ProgressBar,
  Container,
  Col,
  Row,
} from "react-bootstrap";
import DonorForm from "../DonorForm/DonorForm";
import styles from "../Organisation/Organisation.module.css";
import PastItemDonations from "../DonorForm/PastItemDonations";

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Container fluid>
        <Row style={{ marginTop: "15px" }}>
          <Col className={styles.orgsContainer}>
            <Card className={styles.orgInfo}>
              <h6
                style={{
                  textAlign: "left",
                  margin: "7px",
                  fontSize: "16px",
                  color: "#FF7000",
                }}
              >
                <i>YOUR PARTNERSHIP MEANS THE WORLD TO US</i>
              </h6>
              <Card.Title style={{ fontSize: "35px" }}>{org.name}</Card.Title>
              <Card.Subtitle>
                would love your support for
                <br />
                <em style={{ fontSize: "30px" }}>{item.name}</em>
              </Card.Subtitle>
              <Card.Img
                variant="top"
                src={item.img}
                alt={"Image of " + `${item.name}`}
              />
              <Card.Body className="pt-0 px-0">
                <br />
                <Card.Text className="mb-0">
                  ${item.totalDonationsValue || 0} of ${item.initialPrice}
                </Card.Text>
                <br />
                <ProgressBar
                  striped
                  className="mb-3"
                  now={
                    item.totalDonationsValue
                      ? (item.totalDonationsValue / item.initialPrice) * 100
                      : 0
                  }
                  label={`${Math.round(
                    (item.totalDonationsValue / item.initialPrice) * 100
                  )}%`}
                />
                <Card.Text>{item.description}</Card.Text>
                {org.website && (
                  <Card.Text>
                    {" "}
                    Check out the{" "}
                    <a href={org.website}>{`${org.name}`} website</a>
                  </Card.Text>
                )}
              </Card.Body>
              <Link to="/">
                <Button className="goBackBtn" variant="warning">
                  Go back
                </Button>
              </Link>
            </Card>
          </Col>

          <Col className={styles.formContainer}>
            <DonorForm
              org={params.orgID}
              item={params.itemID}
              itemName={item.name}
              itemOrgName={org.name}
              itemAmount={
                Math.round(
                  (item.initialPrice -
                    (item.totalDonationsValue || 0) +
                    Number.EPSILON) *
                    100
                ) / 100
              }
            />
          </Col>
          <Col className={styles.donorsContainer} style={{ marginTop: "40px" }}>
            <div style={{ padding: "5vw", paddingTop: "0px" }}>
              <PastItemDonations />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ItemPage;
