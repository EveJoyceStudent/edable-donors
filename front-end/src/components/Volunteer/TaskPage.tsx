import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import VolunteerForm from "./VolunteerForm";
import styles from "../Organisation/Organisation.module.css";
import { Button, Card, Container, Row, Col, ProgressBar } from "react-bootstrap";
import PastDonations from "../DonorForm/PastDonations";

function TaskPage() {
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
    window.scrollTo(0, 0)
  }, [])

  return (
    //   these lines set up the format of the page
    <div style={{backgroundColor: "#ECFED6", border: "15px solid white", borderRadius: "45px"}}>
      <Container fluid>
        <Row style={{marginTop: "15px"}}>
          <Col className={styles.orgsContainer}>
            <Card className={styles.orgInfo}>
            <h6 style={{ textAlign: "left", margin: "7px" }}>
                <i>YOUR PARTNERSHIP MEANS THE WORLD TO US</i>
              </h6>
              <Card.Title style={{fontSize: "2rem"}}>Organisation</Card.Title>
              <Card.Subtitle>is looking for volunteers<br /><em>to do some stuff!</em></Card.Subtitle>
              <Card.Img className={styles.orgImg} variant="top" src="https://thumbs.dreamstime.com/b/group-volunteer-trees-growing-environment-care-happy-african-american-volunteer-smiling-proposing-you-young-green-130156971.jpg" alt={`${org.name}`+"'s logo"} />
              <Card.Body>
              <Card.Text className="mb-0">
                  80 slots remaining
                </Card.Text>
                <ProgressBar
                  className="mb-3"
                  striped
                  variant="danger"
                  now={20
                  }
                  label={'20%'}
                />
                <Card.Text className={styles.orgDescription}>We would like some people to do some stuff for us! </Card.Text>
                <Card.Text className={styles.orgDescription}>
                  {" "}
                  Check out the <a href={org.website}>{`${org.name}`} website</a>
                </Card.Text>
              </Card.Body>
              <Link to="/volunteer">
                <Button variant="warning">Go back</Button>
              </Link>
            </Card>
          </Col>

          <Col className={styles.formContainer}>
            <VolunteerForm/>
          </Col>
        </Row>
      </Container>

    </div>
  );
}

export default TaskPage;
