import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import {
  Button,
  Card,
  ProgressBar,
  Container,
  Col,
  Row,
} from "react-bootstrap";
import DonorForm from "../DonorForm/DonorForm";
import styles from "../Organisation/Organisation.module.css";
import PastItemDonations from "../DonorForm/PastItemDonations";

function ItemPage() {
  let params = useParams();
  const [item, setItem] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      const itemID = params.itemID || "";
      const orgID = params.orgID || "";

      const docRef = doc(db, `Organisations/${orgID}/Items`, itemID);
      const docSnap = await getDoc(docRef);
      setItem(docSnap.data());
    };
    fetchData().catch(console.error);
  }, [params.itemID, params.orgID]);

  const [org, setOrg] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      const orgId = params.orgID || "";
      const docRef = doc(db, "Organisations", orgId);
      const docSnap = await getDoc(docRef);
      setOrg(docSnap.data());
    };
    fetchData().catch(console.error);
  }, [params.orgID]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  console.log(org);
  return (
    <div className={styles.section}>
      <img src={org.img} alt="" />
      <div className={styles.mainContent}>
        <div>
          <h2 className={styles.orgName}>{org.name}</h2>
          <div className={`${styles.line}`}></div>
          <h3 className={styles.itemName}>
            Donating towards a
            <br />
            <span>{item.name}</span>
          </h3>

          <p className={styles.des}>{item.description}</p>
          <p className={styles.cardAmountToGo}>
            ${item.totalDonationsValue || 0} of ${item.initialPrice}
          </p>
          <div className={styles.progressBarCon}>
            <ProgressBar
              striped
              className="mb-3"
              now={
                item.totalDonationsValue
                  ? (item.totalDonationsValue / item.initialPrice) * 100
                  : 0
              }
              label={`${Math.round(
                (item.totalDonationsValue / item.initialPrice) * 100
              )}%`}
            />
          </div>

          {org.website && (
            <p>
              {" "}
              Check out the <a href={org.website}>{`${org.name}`} website</a>
            </p>
          )}
          <div className={styles.formContainer}>
            <DonorForm
              org={params.orgID}
              item={params.itemID}
              itemName={item.name}
              itemOrgName={org.name}
              itemAmount={
                Math.round(
                  (item.initialPrice -
                    (item.totalDonationsValue || 0) +
                    Number.EPSILON) *
                    100
                ) / 100
              }
            />
          </div>
        </div>

        <div className={styles.sideIdmage}>
          <img
            className={styles.itemImg}
            src={item.img}
            alt={`Image of ${item.name}`}
          />
          <PastItemDonations />
        </div>
      </div>

      <Link to="/">
        <div className={`btn goBackBtn ${styles.backButton}`}>Go back</div>
      </Link>
    </div>
  );
}

export default ItemPage;
