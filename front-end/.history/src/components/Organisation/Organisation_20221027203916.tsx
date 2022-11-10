import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import DonorForm from "../DonorForm/DonorForm";
import styles from "./Organisation.module.css";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import PastDonations from "../DonorForm/PastDonations";

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    //   these lines set up the format of the page
    <div className={styles.body}>
      <div className={styles.section}>
        <img src="" alt="" />
      </div>

      <Row style={{ marginTop: "5px" }}>
        <Col className={styles.orgsContainer}>
          <Card className={styles.orgInfo}>
            <h6
              style={{ textAlign: "center", margin: "7px", color: "#FF7000" }}
            >
              <i>YOU'RE DONATINGS ssEdable SUPPORTING</i>
            </h6>
            <Card.Title style={{ fontSize: "2rem" }}>{org.name}</Card.Title>
            <img
              className={styles.orgImg}
              variant="top"
              src={org.img}
              alt={`${org.name}'s logo`}
            />

            <Card.Text className={styles.orgDescription}>
              {org.description}
            </Card.Text>
            {org.website && (
              <Card.Text className={styles.orgDescription}>
                {" "}
                Check out the <a href={org.website}>{`${org.name}`} website</a>
              </Card.Text>
            )}

            <Link to="/">
              <Button className="goBackBtn" variant="warning">
                Go back
              </Button>
            </Link>
          </Card>
        </Col>

        <Col className={styles.formContainer}>
          <DonorForm org={params.orgId} orgName={org.name} />
        </Col>
      </Row>
      <Row>
        <Col className={styles.donorsContainer} style={{ marginTop: "40px" }}>
          <div style={{ padding: "5vw", paddingTop: "0px" }}>
            <PastDonations />
          </div>
          {/* items go here */}
        </Col>
      </Row>
    </div>
  );
}

export default Organisation;
