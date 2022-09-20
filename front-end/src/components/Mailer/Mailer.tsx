import axios from "axios";
import React from "react";

const generalURL =
  // "http://localhost:8080/mail/general";
  "https://edable-donor-api-test.azurewebsites.net/mail/general"
function Mailer(props: any) {
  const [post, setPost] = React.useState(null);

  function GeneralDonation() {
    axios
      .post(generalURL, {
        amount: props.formData.paidAMT,
        name: props.formData.name,
        donationType: props.formData.monthly,
        donorEmail: props.formData.email,
        orgName: props.orgName
        
      })
      .then((response) => {
        setPost(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      <button onClick={GeneralDonation} type="button">Create Post</button>
    </div>     
   

  );
  
}

export default Mailer;
