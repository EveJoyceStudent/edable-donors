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

    <div className={styles.section}>
      <img src={org.img} alt={`${org.name}'s logo`} />
      <div className={styles.mainContent}>
        <div>
          {org.website && (
            <div className={styles.website}>
              Want to learn more about {org.name}
              <div>
                <a href={org.website}>VIEW WEBSITE</a>
              </div>
            </div>
          )}
        </div>
        <div>
          <h2 className={styles.orgName}>
            Thank you for choosing to support <br />
            {org.name}
          </h2>
          <div className={`${styles.line}`}></div>
          <p className={styles.orgDescription}>{org.description}</p>
        </div>

        <div>
          <p className={styles.orgDescription}>{org.description}</p>
        </div>
        <div className={styles.formContainer}>
          <VolunteerForm orgId={orgID} orgName={org.name} />
        </div>
      </div>
      <Link to="/volunteer">
        <a className={`${styles.btn} ${styles.goBack}`}>GO BACK</a>
      </Link>
    </div>
  );
}

export default DonateTime;
