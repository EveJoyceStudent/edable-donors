// @ts-ignore
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../../config/firebase";

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { convertTypeAcquisitionFromJson } from "typescript";

function Paypal(props: any) {

  const [{ options }, dispatch] = usePayPalScriptReducer();

  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        intent: props.type,
        vault: props.watchSubscription
      },
    });
  }, [props.type, props.watchSubscription]);

  let navigate = useNavigate();

  const [paypalDisplayed, setPaypalDisplayed] = useState(true);

  const paypalDisabledNavigate = (link: string) => {
    setPaypalDisplayed(false);
    navigate(link);
  };

  const [formAttemptedIncomplete, setFormAttemptedIncomplete] = useState(false);

  const [purchaseData, setPurchaseData] = useState({
    purchase_units: [
      {
        amount: {
          value: "1",
          breakdown: {
            item_total: {
              currency_code: "AUD",
              value: "1",
            },
          },
        },
        description: "",
        items: [
          {
            name: "donation",
            quantity: "1",
            unit_amount: {
              currency_code: "AUD",
              value: "1",
            },
            category: "DONATION",
          },
        ],
        soft_descriptor: "donation"
      },
    ],
  });

  useEffect(() => {
    setPurchaseData({
      purchase_units: [
        {
          amount: {
            value: (props.watchPaidAMT).toString(),
            breakdown: {
              item_total: {
                currency_code: "AUD",
                value: (props.watchPaidAMT).toString(),
              },
            },
          },
          description: "",
          items: [
            {
              name: "donation",
              quantity: "1",
              unit_amount: {
                currency_code: "AUD",
                value: (props.watchPaidAMT).toString(),
              },
              category: "DONATION",
            },
          ],
          soft_descriptor: "donation"
        },
      ],
    });
  }, [props.watchPaidAMT]);

  const createSubscriptionContent = ((data: any, actions: any) => {
    return actions.subscription
      .create({
        plan_id: "P-70L40494657433117MMMU72Q",
        quantity: Math.floor(props.watchPaidAMT)
      });
  });

  const createOrderContent = ((data: any, actions: any) => {
    return actions.order.create(purchaseData);
  });

  const approveSubscriptionContent = ( async (data: any, actions: any) => {
    return actions.subscription?.get().then(async (details:any) => {
      try {
          const orgRef = await addDoc(collection(db, `Organisations/${props.org}/GeneralDonations/Summary/Donations`),
            {
              orgID: props.org,
              IsError: false,
              IsSubscription: true,
              amount: props.watchPaidAMT,
              IsRefunded: false,
              donationDate: Timestamp.now(),
              donor: {
                email: props.formData.email,
                phoneNumber: props.formData.phone,
                mailingAddress: '',
                name: props.formData.name,
                IsAnon: props.formData.IsAnon,
                agreeToContact: props.formData.mailingList,
              }
            }
          );
        paypalDisabledNavigate("../../success");

      } catch (e) {
        console.log('error', e);
      }
    })}
  );

  const approveOrderContent = ( async (data: any, actions: any) => {
      return actions.order.capture().then(async (details:any) => {
        try {
          const orgRef = await addDoc(collection(db, `Organisations/${props.org}/GeneralDonations/Summary/Donations`),
            {
              orgID: props.org,
              IsError: false,
              IsSubscription: false,
              amount: props.watchPaidAMT,
              IsRefunded: false,
              donationDate: Timestamp.now(),
              donor: {
                email: props.formData.email,
                phoneNumber: props.formData.phone,
                mailingAddress: '',
                name: props.formData.name,
                IsAnon: props.formData.IsAnon,
                agreeToContact: props.formData.mailingList,
              }
            }
          );
          const name = details.payer.name!.given_name;
          paypalDisabledNavigate("../../success");

        } catch (e) {
          console.log('error', e);
        }
      });
    });

    const approveItemOrderContent = ( async (data: any, actions: any) => {
      return actions.order.capture().then(async (details:any) => {
        try {
          const donorRef = await addDoc(collection(db, `Donors`),
          {
            email: props.formData.email,
            phoneNumber: props.formData.phone,
            mailingAddress: '',
            name: props.formData.name,
            IsAnon: props.formData.IsAnon,
            agreeToContact: props.formData.mailingList,
          }
          )
          const orgRef = await addDoc(collection(db, `Organisations/${props.org}/Items/${props.item}/ItemDonations/ItemSummary/Donations`),
            {
              donorID: donorRef.id,
              orgID: props.org,
              IsError: false,
              amount: props.watchPaidAMT,
              IsRefunded: false,
              donationDate: Timestamp.now(),
            }
          );
          const name = details.payer.name!.given_name;
          paypalDisabledNavigate("../../success");

        } catch (e) {
          console.log('error', e);
        }
      });
    });


  return (
    //   these lines set up the format of the page
    <>
      {(props.disabled && formAttemptedIncomplete) && <div>Please complete the form.</div>}
      {paypalDisplayed &&
        <PayPalButtons

          {...(props.watchSubscription ? { createSubscription: createSubscriptionContent } : { createOrder: createOrderContent } )}
          {...(props.watchSubscription ? { style: { label: "subscribe", } } : { style: { label: "donate", } } )}
          disabled={props.disabled}
          forceReRender={[purchaseData, props.watchPaidAMT, props.watchSubscription]}
          onClick={(data, actions) => {
            if (props.disabled) {
              setFormAttemptedIncomplete(true);
            }
          }}
          onCancel={(data, actions) => {
            return paypalDisabledNavigate(`../../cancel/${props.org}`);
          }}
          onError={(err) => {
            window.alert(err);
            return paypalDisabledNavigate(`../../cancel/${props.org}`);
          }}
          {...(props.watchSubscription ? { onApprove: approveSubscriptionContent } : { onApprove: approveOrderContent } )}
        />
      }
    </>
  );
}

export default Paypal;

// submit button to direct to THANK U page
// validation for ENTER AMOUNT & PHONE (int)
