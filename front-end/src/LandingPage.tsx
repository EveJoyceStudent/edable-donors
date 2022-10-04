import React, { useEffect, useState } from "react";
import "./App.css";
import mockData from "./mock-data.json";

function LandingPage() {
  let [count, setCount] = useState(0);
  const [orgDescp, setOrgDescp] = useState("");

  useEffect(() => {
    setOrgDescp(mockData[count].orgDesc);
  }, [count]);

  const handleTypeChange = (e: any) => {
    setCount((count = e.target.value));
  };

  return (
    <div className="container">
      <select onChange={(e) => handleTypeChange(e)}>
        {mockData.map((org) => (
          <option value={org.orgID}>{org.orgName} </option>
        ))}
      </select>
      <p>{orgDescp}</p>
    </div>
  );
}

export default LandingPage;
