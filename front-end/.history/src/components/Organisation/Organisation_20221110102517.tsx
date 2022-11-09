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

  console.log(org);
  return (
    <div>
      <div className={styles.section}>
        <img
          className={styles.orgImg}
          src={org.img}
          alt={`${org.name}'s logo`}
        />
        <div className={styles.mainContent}>
          <div className={`${styles.sideIdmage} ${styles.desktopSideImg}`}>
            <PastDonations />
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
              {org.name}
              <br />
              <span className={styles.orgNameSpan}>
                Every little bit counts
              </span>
            </h2>
            <div className={`${styles.line}`}></div>

            <p className={styles.des}>{org.description}</p>
            <div className={styles.formContainer}>
              <DonorForm org={params.orgId} orgName={org.name} />
            </div>
          </div>
          <div className={`${styles.sideIdmage} ${styles.mobileSideImg}`}>
            <PastDonations />
            {org.website && (
              <div className={styles.website}>
                Want to learn more about {org.name}
                <div>
                  <a href={org.website}>VIEW WEBSITE</a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    //   these lines set up the format of the page
  );
}

export default Organisation;
