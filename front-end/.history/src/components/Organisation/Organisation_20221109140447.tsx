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
    <div>
      <div className={styles.section}>
        <img
          className={styles.orgImg}
          src={org.img}
          alt={`${org.name}'s logo`}
        />
        <div className={styles.mainContent}>
          <div className={styles.sideIdmage}>
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
            <h2 className={styles.orgName}>{org.name}</h2>
            <div className={`${styles.line}`}></div>
            <h3 className={styles.itemName}>
              Thank you for choosing to donate to
              <br />
            </h3>
          </div>
        </div>

        <div className={`${styles.header} `}>
          <Link to="/">
            <a className={`${styles.goBack} ${styles.btn}`}>Go back</a>
          </Link>
          {org.website && (
            <a className={`${styles.btn} ${styles.website}`} href={org.website}>
              {`${org.name.toUpperCase()}`} WEBSITE
            </a>
          )}
        </div>

        <div>
          <h6>
            Thank you for choosing to donate to <br />
            <div>{org.name}</div>
            <p className={styles.orgDescription}>{org.description}</p>
          </h6>
        </div>
        <div className={styles.formContainer}>
          <DonorForm org={params.orgId} orgName={org.name} />
        </div>
        <PastDonations />
      </div>
    </div>
    //   these lines set up the format of the page
  );
}

export default Organisation;
