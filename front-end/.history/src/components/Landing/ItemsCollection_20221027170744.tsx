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
import "../Item/ProgressBar.css";

function ItemsCollection(props: any) {
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

  function mergeLists() {
    const mergeList: any = [];
    itemList.map((item: any) => {
      props.orgList.map((org: any) => {
        if (item.parentDoc === org.id) {
          if (item.data.activeStatus === true) {
            mergeList.push({
              ...item,
              orgName: org.data.name,
              orgActiveStatus: org.data.activeStatus,
            });
          }
        }
      });
    });
    return mergeList;
  }

  const mergeList = mergeLists();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const filteredItems = mergeList.filter((item: any) =>
    item.data.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <>
      <div className={styles.containerDiv}>
        <h2 className={styles.title}>
          Help microbusinesses get the items they need!
        </h2>
        <div
          className={styles.searchBar}
          style={{
            borderRadius: "3px",
            display: "flex",
            alignItems: "right",
            justifyContent: "right",
          }}
        >
          <input
            style={{ fontSize: "16px" }}
            className={styles.input}
            type="text"
            onChange={handleChange}
            placeholder="Search"
          />
        </div>

        <div className={styles.cardParentDiv}>
          {filteredItems.map((item: any) => (
            <div key={item.id.toString()} className={styles.cards}>
              <img src={item.data.img} alt={`Image of  ${item.data.name}`} />
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{item.orgName}:</h3>
                <h4 className={styles.cardItem}>{item.data.name}</h4>
                <p>{item.data.summary}</p>
                <ProgressBar
                  striped
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
                <Link
                  style={{
                    textDecoration: "none",
                    color: "black",
                  }}
                  to={`item/${item.parentDoc}/${item.id}`}
                >
                  here
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ItemsCollection;
