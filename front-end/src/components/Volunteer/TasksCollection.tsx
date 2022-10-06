import { useState, useEffect } from "react";
import {
  collectionGroup,
  query,
  onSnapshot,
  collection,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import Card from "react-bootstrap/Card";
import ProgressBar from "react-bootstrap/ProgressBar";
import { Link } from "react-router-dom";
import styles from "../Landing/ItemsCollection.module.css";

function GetOrgs(){
  const [orgList, setOrgList] = useState<any>([]);

  // gets all the orgs from dbs
  useEffect(() => {
    const q = query(collection(db, "Organisations"));
    onSnapshot(q, (querySnapshot) => {
      // setOrgList dumps all the orgs in orgList
      setOrgList(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);
  return([orgList]);
}

function TasksCollection() {
  ///Searches for the organanisation's name through item's orgID
  const [orgList] = GetOrgs();
  function Filter(value: string){
    for (let i = 0; i < orgList.length; i++) {
      if (orgList[i].id == value){
        return(orgList[i].data.name);
      }
    }
  }

  const [itemList, setItemList] = useState<any>([]);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const q = query(
      collectionGroup(db, "Items"),
      where("activeStatus", "==", true)
    );

    onSnapshot(q, async (querySnapshot) => {
      setItemList(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
          parentDoc: doc.ref.parent.parent?.id,
        }))
      );
    });
  }, []);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const filteredItems = itemList.filter((item: any) =>
    item.data.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className={styles.containerDiv}>
        <p style={{ paddingTop: "15px", fontSize: "20px" }}>
          Or check out our other campaigns!
        </p>
        <div
          className="searchBar"
          style={{
            display: "flex",
            alignItems: "right",
            justifyContent: "right",
          }}
        >
          <input
            className={styles.input}
            type="text"
            onChange={handleChange}
            placeholder="Search"
          />
        </div>

        <div className={styles.cardParentDiv}>
            <Card
            border="warning"
            key=""
            className={styles.cards}
          >
            <Link
              to="/volunteer/task-page"
              style={{
                textDecoration: "none",
                color: "black",
              }}
            >
              <Card.Body>
                <Card.Title>Outstanding Tasks<br/>Organisation</Card.Title>
                <div style={{ textAlign: "center" }}>
                  <Card.Img className={styles.itemImg}
                    variant="top"
                    src="https://thumbs.dreamstime.com/b/group-volunteer-trees-growing-environment-care-happy-african-american-volunteer-smiling-proposing-you-young-green-130156971.jpg"
                  />
                </div>
                <div style={{ display: "flex" }}>
                  <label style={{ fontSize: "12px" }}>
                    80 slots availble
                  </label>
                </div>
                <ProgressBar
                  className="mb-3"
                  striped
                  variant="danger"
                  now={20
                  }
                  label={'20%'}
                />
                <Card.Text>We would like some people to do some stuff for us! </Card.Text>
              </Card.Body>
            </Link>
          </Card>
        </div>
      </div>
    </>
  );
}

export default TasksCollection;
