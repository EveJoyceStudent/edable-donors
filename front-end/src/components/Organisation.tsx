import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { db } from '../config/firebase';
import { doc, getDoc } from "firebase/firestore"

function Organisation() {
  let params = useParams();
  const [org, setOrg] = useState<any>([])

  useEffect(() => {
    const fetchData = async () => {
      const orgId = params.orgId || '';
      const docRef = doc(db, 'Organisations', orgId);
      const docSnap = await getDoc(docRef);
      setOrg(docSnap.data());
    }
    fetchData().catch(console.error);
  }, [params.orgId])

  return (
    //   these lines set up the format of the page
    <div>
      <h1>
        {org.name} Donation Page
      </h1>
      <div>
        <img src={org.img} alt={`${org.name}`} />
        <div>{org.name}</div>
        <Link to="/">Home</Link>
      </div>
    </div>
  );
}

export default Organisation;