import { useState, useEffect } from "react";
import { collectionGroup, query, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";
import Card from "react-bootstrap/Card";
import ProgressBar from "react-bootstrap/ProgressBar";
import { Link } from "react-router-dom";
import styles from "../styling/ItemsCollection.module.css";

function ItemsCollection() {
  const [itemList, setItemList] = useState<any>([]);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const items = query(collectionGroup(db, "Items"));
    onSnapshot(items, async (querySnapshot) => {
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
        <p style={{ paddingTop: "15px", fontSize: "30px" }}>
          Or Checkout our other campaigns!
        </p>
        <br></br>
        <input
          className={styles.input}
          type="text"
          onChange={handleChange}
          placeholder="Search"
        />

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
                <Card.Body>
                  <Card.Title>{item.data.name}</Card.Title>
                  <div style={{ display: "flex" }}>
                    <label style={{ fontSize: "12px" }}>
                      ${item.data.totalDonation} Out of $
                      {item.data.initialPrice}
                    </label>
                  </div>
                  <ProgressBar
                    striped
                    variant="danger"
                    now={
                      (item.data.totalDonation / item.data.initialPrice) * 100
                    }
                    label={`${Math.round(
                      (item.data.totalDonation / item.data.initialPrice) * 100
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
