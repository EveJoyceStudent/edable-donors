// @ts-ignore
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../config/firebase";

import { PayPalButtons } from "@paypal/react-paypal-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


function Paypal(props: any) {
  let navigate = useNavigate();

  const [paypalDisplayed, setPaypalDisplayed] = useState(true);

  const paypalDisabledNavigate = ( link:string ) => {
    setPaypalDisplayed(false);
    navigate(link);
  }

  const [formAttemptedIncomplete, setFormAttemptedIncomplete] = useState(false);

  const [purchaseData, setPurchaseData] = useState({
    purchase_units: [
      {
        amount: {
          value: "1",
        },
      },
    ],
  });

  useEffect(() => {
    setPurchaseData({
      purchase_units: [
        {
          amount: {
            value: (props.watchPaidAMT).toString(),
          },
        },
      ],
    })
  }, [props.watchPaidAMT]);

  return (
    //   these lines set up the format of the page
    <>
      {(props.disabled && formAttemptedIncomplete) && <div>Please complete the form.</div>}
      {/* <input type="submit" /> */}
      {paypalDisplayed && 
      <PayPalButtons
      disabled={props.disabled}
        forceReRender={[purchaseData, props.formData]}
        onClick={(data, actions) => {
          if (props.disabled) {
            setFormAttemptedIncomplete(true);
          }
        }}
        createOrder={(data, actions) => {
          return actions.order.create(purchaseData);
        }}
        onCancel={(data, actions) => {
          return paypalDisabledNavigate(`../../cancel/${props.org}`);
        }}
        onError={(err) => {
          return paypalDisabledNavigate(`../../cancel${props.org}`);
        }}
        
        onApprove={async (data, actions) => {
          return actions.order!.capture().then(async (details) => {
            try {
              // console.log(props.formData);
              const orgRef = await addDoc(collection(db, `Organisations/${props.org}/GeneralDonations/Summary/Donations`),
                props.formData,
              );
              console.log("it works", orgRef);
              const name = details.payer.name!.given_name;
              console.log(`Transaction completed by ${name}`);
              paypalDisabledNavigate("../../success");

            } catch (e) {
              console.log('error');
            }
          });
        }}
        />
      }
    </>
  );
}

export default Paypal;

// submit button to direct to THANK U page
// validation for ENTER AMOUNT & PHONE (int)
