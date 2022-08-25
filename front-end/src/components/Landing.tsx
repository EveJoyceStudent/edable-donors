import { useState } from "react";
import { Link } from "react-router-dom";
import FirebaseExample from "./FirebaseExample";

function Landing() {
  const [orgList, setOrgList] = useState([1, 2, 3]);

  return (
    //   these lines set up the format of the page
    <div>
      <h1>
        Landing Page
      </h1>
      {/* <FirebaseExample/> */}
      <div>
        <Link to="general">General Donation</Link>
      </div>
      <ul>
        {orgList.map((orgId) =>
          <li key={orgId.toString()} value={orgId} >
            <Link to={`organisation/${orgId}`}>Organisation {orgId}</Link>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Landing;