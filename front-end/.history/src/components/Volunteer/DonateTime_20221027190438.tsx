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
    <>
      <div className={styles.section}>
        <Link to="/volunteer">
          <Button variant="warning">Go back</Button>
        </Link>
        <img
          className={styles.orgImg}
          src={org.img}
          alt={`${org.name}'s logo`}
        />
        <div>
          <h6>
            Thank you for choosing to support <span>{org.name}</span>
          </h6>

          <p className={styles.orgDescription}>{org.description}</p>
          {org.website && (
            <p className={styles.orgDescription}>
              Check out the <a href={org.website}>{`${org.name}`} website</a>
            </p>
          )}
        </div>

        <div className={styles.formContainer}>
          <VolunteerForm orgId={orgID} orgName={org.name} />
        </div>
      </div>
    </>
  );
}

export default DonateTime;
