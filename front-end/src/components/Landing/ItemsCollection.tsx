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

function ItemsCollection() {
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
  console.log(itemList);

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
                  <Card.Title>{item.data.name}</Card.Title>
                  <div style={{ textAlign: "center" }}>
                    <Card.Img
                      variant="top"
                      src={item.data.img}
                      style={{
                        height: "200px",
                        width: "200px",
                      }}
                    />
                  </div>
                  <div style={{ display: "flex" }}>
                    <label style={{ fontSize: "12px" }}>
                      ${item.data.totalDonations || 0} of $
                      {item.data.initialPrice}
                    </label>
                  </div>
                  <ProgressBar
                    variant="warning"
                    now={
                      (item.data.totalDonations / item.data.initialPrice) * 100
                    }
                    label={`${Math.round(
                      (item.data.totalDonations / item.data.initialPrice) * 100
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
