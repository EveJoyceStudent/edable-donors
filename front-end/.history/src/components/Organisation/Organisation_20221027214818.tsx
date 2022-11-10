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

    <div className={styles.section}>
      <img className={styles.orgImg} src={org.img} alt={`${org.name}'s logo`} />

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
  );
}

export default Organisation;
