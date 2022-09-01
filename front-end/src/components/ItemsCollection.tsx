import { useState, useEffect } from "react";
import { collectionGroup, query, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";
import Card from "react-bootstrap/Card";
import ProgressBar from "react-bootstrap/ProgressBar";
import { Link } from "react-router-dom";

function ItemsCollection() {
  const [itemList, setItemList] = useState<any>([]);

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

  return (
    <>
      <div>Serach BAr here</div>
      <div style={{ display: "flex", margin: "15px" }}>
        {itemList.map((item: any) => (
          <Link
            style={{
              textDecoration: "none",
              color: "black",
            }}
            to={`item/${item.parentDoc}/${item.id}`}
          >
            <div>{item.parentDoc.id}</div>
            <Card
              border="warning"
              bg="info"
              style={{ width: "20rem", marginLeft: "20px" }}
              key={item.id.toString()}
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
                  <label style={{ paddingRight: "100px" }}>
                    ${item.data.totalDonation}
                  </label>
                  <label style={{ textAlign: "right" }}>
                    ${item.data.initialPrice}
                  </label>
                </div>
                <ProgressBar
                  striped
                  variant="danger"
                  now={(item.data.totalDonation / item.data.initialPrice) * 100}
                  label={`${Math.round(
                    (item.data.totalDonation / item.data.initialPrice) * 100
                  )}%`}
                />
                <Card.Text>{item.data.summary}</Card.Text>
              </Card.Body>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
}

export default ItemsCollection;
