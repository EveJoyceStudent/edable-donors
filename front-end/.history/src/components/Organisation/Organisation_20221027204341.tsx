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
        <img
          className={styles.orgImg}
          src={org.img}
          alt={`${org.name}'s logo`}
        />
        <div className={styles.content}>
          <div className={styles.header}>
            <Link to="/">
              <a className={`${styles.goBack} ${styles.btn}`}>Go back</a>
            </Link>
            {org.website && (
              <a
                className={`${styles.btn} ${styles.website}`}
                href={org.website}
              >
                {`${org.name.toUpperCase()}`} WEBSITE
              </a>
            )}
          </div>
        </div>
        <div>
          <h6>
            Thank you for choosing to donate to <br />
            <div>{org.name}</div>
          </h6>
        </div>
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

            <Card.Text className={styles.orgDescription}>
              {org.description}
            </Card.Text>
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
