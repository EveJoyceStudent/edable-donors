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

  return (
    //   these lines set up the format of the page
    <div style={{backgroundColor: "#ECFED6", border: "15px solid white", borderRadius: "45px"}}>
      <Container fluid>
        <Row style={{marginTop: "15px"}}>
          <Col className={styles.orgsContainer}>
            <Card className={styles.orgInfo}>
              <h6 style={{ textAlign: "left", margin: "7px" }}>
                <i>YOU'RE DONATING TOWARDS Edable SUPPORTING</i>
              </h6>
              <Card.Title>{org.name}</Card.Title>
              <Card.Img variant="top" src={org.img} alt={`${org.name}`} />
              <Card.Body>
                <Card.Text>{org.description}</Card.Text>
                <Card.Text>
                  {" "}
                  Check out the <a href={org.website}>{`${org.name}`} website</a>
                </Card.Text>
              </Card.Body>
              <Link to="/">
                <Button variant="warning">Go back</Button>
              </Link>
            </Card>
          </Col>

          <Col className={styles.formContainer}>
            <DonorForm org={params.orgId} />
          </Col>

          <Col className={styles.donorsContainer} style={{marginTop: "40px"}}>
              <div style={{ padding: "5vw", paddingTop: "0px"}}>
                <PastDonations />
              </div>
              {/* items go here */}
          </Col>
        </Row>
      </Container>

    </div>
  );
}

export default Organisation;
