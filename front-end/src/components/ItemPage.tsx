import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../config/firebase";
import { doc, getDoc, collection, onSnapshot } from "firebase/firestore";

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
  }, [params.itemID]);

  return (
    <>
      <div>
        <h1>{item.name}</h1>
      </div>
    </>
  );
}

export default ItemPage;
