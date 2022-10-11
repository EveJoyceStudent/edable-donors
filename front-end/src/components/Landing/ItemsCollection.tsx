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
import styles from "./ItemsCollection.module.css";

function ItemsCollection(props: any) {
  function GetOrgs() {
    const [initialOrgList, setOrgList] = useState<any>([]);
    useEffect(() => {
      setOrgList(props.orgList);
    }, []);
    return [initialOrgList];
  }
  ///Searches for the organanisation's name through item's orgID
  const [initialOrgList] = GetOrgs();
  function Filter(value: string) {
    for (let i = 0; i < initialOrgList.length; i++) {
      if (initialOrgList[i].id == value) {
        return initialOrgList[i].data.name;
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
          {filteredItems.map((item: any) => (
            <Card
              border="warning"
              key={item.id.toString()}
              className={styles.cards}
            >
              <Link
                style={{
                  textDecoration: "none",
                  color: "black",
                }}
                to={`item/${item.parentDoc}/${item.id}`}
              >
                <Card.Body>
                  <Card.Title>
                    {item.data.name}
                    <br></br>
                    {Filter(item.data.orgID)}
                  </Card.Title>
                  <div style={{ textAlign: "center" }}>
                    <Card.Img
                      className={styles.itemImg}
                      variant="top"
                      src={item.data.img}
                      alt={"Image of " + `${item.data.name}`}
                    />
                  </div>
                  <div style={{ display: "flex" }}>
                    <label style={{ fontSize: "12px" }}>
                      ${item.data.totalDonationsValue || 0} of $
                      {item.data.initialPrice}
                    </label>
                  </div>
                  <ProgressBar
                    variant="warning"
                    now={
                      item.data.totalDonationsValue
                        ? (item.data.totalDonationsValue /
                            item.data.initialPrice) *
                          100
                        : 0
                    }
                    label={`${Math.round(
                      (item.data.totalDonationsValue / item.data.initialPrice) *
                        100
                    )}%`}
                  />
                  <Card.Text>{item.data.summary}</Card.Text>
                </Card.Body>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}

export default ItemsCollection;
