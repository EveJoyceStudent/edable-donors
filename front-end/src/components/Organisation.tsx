import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { db } from '../config/firebase';
import { doc, getDoc, addDoc, collection } from "firebase/firestore"

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

  const runPost = async ()=> {
    try{
      const docRef = await addDoc(collection(db,'Donors'),
      {
          email:'',
          mailingAdddress: '',
          phone: 0,
          name: '',
          isAnon: false,
          agreeToContact: false,
          totalDonated: 0,
          totalDonations: 0
      }
      );
      console.log("it works", docRef)
    } catch(e){
      console.log('error')
    }
  }
    

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
      <button onClick={runPost}>POST</button>
    </div>
  );

}
export default Organisation;