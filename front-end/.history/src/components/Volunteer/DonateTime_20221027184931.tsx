import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import VolunteerForm from "./VolunteerForm";
import styles from "../Organisation/Organisation.module.css";
import { Button, Card, Container, Row, Col } from "react-bootstrap";

function DonateTime() {
  let params = useParams();
  const [org, setOrg] = useState<any>([]);
  const orgID = params.orgId;

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
    <div>
      <div>
        <div>
          <h6>YOU'RE DONATING TOWARDS Edable SUPPORTINGsfdf</h6>
          <div>{org.name}</div>
          <img
            className={styles.orgImg}
            src={org.img}
            alt={`${org.name}` + "'s logo"}
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

          <Link to="/volunteer">
            <Button variant="warning">Go back</Button>
          </Link>
        </div>

        <Col className={styles.formContainer}>
          <VolunteerForm orgId={orgID} orgName={org.name} />
        </Col>
      </div>
    </div>
  );
}

export default DonateTime;
