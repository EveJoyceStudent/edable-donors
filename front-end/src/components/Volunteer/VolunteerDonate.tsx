// @ts-ignore
import {
    collection,
    doc,
    runTransaction,
    Timestamp,
  } from "firebase/firestore";
  import { db } from "../../config/firebase";
  import axios from "axios";
  const volunteerURL =
  `${process.env.REACT_APP_API_URL}mail/General`;
 
  function VolunteerDonate(props:any) {
    axios
    .post(volunteerURL, {
        volunteerName: props.formData.volunteerName,
        volunteerPhone: props.formData.volunteerPhone,
        volunteerEmail: props.formData.volunteerEmail,
        volunteerOrgName: props.formData.volunteerOrgName,
        volunteerDOB: props.formData.volunteerDOB,
        volunteerAmount: props.formData.volunteerAmount,
        volunteerHours: props.formData.volunteerHours,
        volunteerPostcode: props.formData.volunteerPostcode,
        volunteerComment: props.formData.volunteerComment,
        volunteerHowHeard: props.formData.volunteerHowHeard,
        volunteerHowHeardOther: props.formData.volunteerHowHeardOther,
        howContribute: props.formData.howContribute,
        
      })
      .then((response) => {
      })
      .catch((error) => {
        console.log(error);
      });
      console.log(volunteerURL)
      return (
        <label>testReturn</label>
        )
      }
  export default VolunteerDonate;
