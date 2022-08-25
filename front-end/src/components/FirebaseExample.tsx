
import { useEffect, useState } from 'react';
import { db } from '../config/firebase';
import { collection, query, onSnapshot } from "firebase/firestore"

function FirebaseExample() {
  
  const [orgs, setOrgs] = useState<any>([])

  useEffect(() => {
    const q = query(collection(db, 'Organisations'))
    onSnapshot(q, (querySnapshot) => {
      setOrgs(querySnapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    })
  }, [])

  return (
    <>
      <div>test</div>
      {orgs.map((org: any) => (
        <>
          <div>{org.id}</div>
          <div>{org.data.name}</div>
        </>
      ))}

    </>
  );
}

export default FirebaseExample;