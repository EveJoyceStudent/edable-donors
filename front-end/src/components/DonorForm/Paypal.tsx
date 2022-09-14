// @ts-ignore
import { addDoc, collection, doc, getDoc, increment, runTransaction, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

  const approveSubscriptionContent = (async (data: any, actions: any) => {
    return actions.subscription?.get().then(async (details: any) => {
      try {
        await runTransaction(db, async (transaction) => {
          const orgRef = await addDoc(collection(db, `Organisations/${props.org}/GeneralDonations/Summary/Donations`),
            {
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
          const summaryRef = await updateDoc(doc(db, `Organisations/${props.org}/GeneralDonations/Summary`),
            {
              numberOfDonations: increment(1),
              totalGeneralDonations: increment(props.watchPaidAMT)
            }
          );

        });
        paypalDisabledNavigate("../../success");

      } catch (e) {
        console.log('error', e);
      }
    });
  }
  );

  const approveOrderContent = (async (data: any, actions: any) => {
    if(!props.item){

      return actions.order.capture().then(async (details: any) => {
        try {
          await runTransaction(db, async (transaction) => {
            const orgRef = await addDoc(collection(db, `Organisations/${props.org}/GeneralDonations/Summary/Donations`),
              {
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
              const docRef = doc(db, `Organisations/${props.org}/GeneralDonations/Summary`);
              const docSnap = await getDoc(docRef);
              if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
              } else {
                const summaryRef = await setDoc(doc(db, `Organisations/${props.org}/GeneralDonations/Summary`),
                {
                  numberOfDonations: 0,
                  totalGeneralDonations: 0
                }
              );
              }
              const summaryRef = await updateDoc(doc(db, `Organisations/${props.org}/GeneralDonations/Summary`),
              {
                numberOfDonations: increment(1),
                totalGeneralDonations: increment(props.watchPaidAMT)
              }
            );
  
          });
          paypalDisabledNavigate("../../success");
  
        } catch (e) {
          console.log('error', e);
        }
      });
    } else {

      return actions.order.capture().then(async (details: any) => {
        try {
          await runTransaction(db, async (transaction) => {
          const orgRef = await addDoc(collection(db, `Organisations/${props.org}/Items/${props.item}/ItemDonations/ItemSummary/Donations`),
            {
              IsError: false,
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
          const docRef = doc(db, `Organisations/${props.org}/Items/${props.item}/ItemDonations/ItemSummary`);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
          } else {
            const summaryRef = await setDoc(doc(db, `Organisations/${props.org}/Items/${props.item}/ItemDonations/ItemSummary`),
            {
              numberOfDonations: 0,
              totalItemDonations: 0
            }
          );
          }
          const summaryRef = await updateDoc(doc(db, `Organisations/${props.org}/Items/${props.item}/ItemDonations/ItemSummary`),
            {
              numberOfDonations: increment(1),
              totalItemDonations: increment(props.watchPaidAMT)
            }
          );
    
        });
          paypalDisabledNavigate("../../success");
    
        } catch (e) {
          console.log('error', e);
        }
      });
    }
  });

  return (
    <>
      {(props.disabled && formAttemptedIncomplete) && <div>Please complete the form.</div>}
      {paypalDisplayed &&
        <PayPalButtons

          {...(props.watchSubscription ? { createSubscription: createSubscriptionContent } : { createOrder: createOrderContent })}
          {...(props.watchSubscription ? { style: { label: "subscribe", } } : { style: { label: "donate", } })}
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
          {...(props.watchSubscription ? { onApprove: approveSubscriptionContent } : { onApprove: approveOrderContent })}
        />
      }
    </>
  );
}

export default Paypal;

// submit button to direct to THANK U page
// validation for ENTER AMOUNT & PHONE (int)
