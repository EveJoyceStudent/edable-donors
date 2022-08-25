import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { db } from '../config/firebase';
import { collection, query, onSnapshot } from "firebase/firestore"

function Landing() {

  const [orgList, setOrgList] = useState<any>([])

  useEffect(() => {
    const q = query(collection(db, 'Organisations'))
    onSnapshot(q, (querySnapshot) => {
      setOrgList(querySnapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    })
  }, [])

  return (
    //   these lines set up the format of the page
    <div>
      <h1>
        Landing Page
      </h1>
      <div>
        <Link to="general">General Donation</Link>
      </div>
      <ul>
        {orgList.map((org:any) =>
          <li key={org.id.toString()} value={org.id} >
            <Link to={`organisation/${org.id}`}>Organisation {org.data.name}</Link>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Landing;