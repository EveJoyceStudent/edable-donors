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

  const generalDonationTransactions = async (subscription: boolean) => {
    await runTransaction(db, async (transaction) => {
      // update publicly accessible donation data
      const orgRef = await addDoc(collection(db, `Organisations/${props.org}/GeneralDonations`),
        {
          donorPublicName: props.formData.IsAnon ? 'Anonymous' : props.formData.name,
          amount: props.watchPaidAMT,
          IsRefunded: false,
          IsSubscribed: subscription,
          comment: '',
          donationDate: Timestamp.now()
        }
      );
      // update private donation data
      await setDoc(doc(db, `Organisations/${props.org}/GeneralDonations/${orgRef.id}/Private`,"Private"),
        {
          name: props.formData.name,
          email: props.formData.email,
          phoneNumber: props.formData.phone,
          mailingAddress: '',
          IsAnon: props.formData.IsAnon,
          agreeToContact: props.formData.mailingList,
          howHeard: '',
        }
      );
      // update donation summaries
      await updateDoc(doc(db, `Organisations/${props.org}`),
        {
          totalDonationCount: increment(1),
          totalGeneralDonationsCount: increment(1),
          totalDonationsValue: increment(props.watchPaidAMT),
          totalGeneralDonationsValue: increment(props.watchPaidAMT)
        }
      );
    });

  };

  const approveSubscriptionContent = (async (data: any, actions: any) => {
    return actions.subscription?.get().then(async (details: any) => {
      try {
        await generalDonationTransactions(true);
        paypalDisabledNavigate("../../success");

      } catch (e) {
        console.log('error', e);
      }
    });
  }
  );

  const approveOrderContent = (async (data: any, actions: any) => {
    if (!props.item) {

      return actions.order.capture().then(async (details: any) => {
        try {
          await generalDonationTransactions(false);
          paypalDisabledNavigate("../../success");

        } catch (e) {
          console.log('error', e);
        }
      });
    } else {

      return actions.order.capture().then(async (details: any) => {
        try {
          await runTransaction(db, async (transaction) => {
            // update publicly accessible donation data
            const itemRef = await addDoc(collection(db, `Organisations/${props.org}/Items/${props.item}/ItemsDonations`),
              {
                donorPublicName: props.formData.IsAnon ? 'Anonymous' : props.formData.name,
                amount: props.watchPaidAMT,
                IsRefunded: false,
                comment: '',
                donationDate: Timestamp.now()
              }
            );
            // update private donation data
            await setDoc(doc(db, `Organisations/${props.org}/Items/${props.item}/ItemsDonations/${itemRef.id}/Private`,"Private"),
              {
                name: props.formData.name,
                email: props.formData.email,
                phoneNumber: props.formData.phone,
                mailingAddress: '',
                IsAnon: props.formData.IsAnon,
                agreeToContact: props.formData.mailingList,
                howHeard: '',
              }
            );

            // update donation summaries
            // first check if this donation will complete the donations to an item and disactivate if complete
            const itemSummary = await getDoc(doc(db, `Organisations/${props.org}/Items/${props.item}`));
            let activeStatusUpdate = itemSummary.data()!.activeStatus;
            let dateCompletedUpdate = itemSummary.data()!.dateCompleted;
            // console.log(itemSummary.data()!.initialPrice ,itemSummary.data()!.totalDonationsValue , Number(props.watchPaidAMT), itemSummary.data()!.initialPrice <= (itemSummary.data()!.totalDonationsValue + Number(props.watchPaidAMT)));
            if (itemSummary.data()!.initialPrice <= (itemSummary.data()!.totalDonationsValue + Number(props.watchPaidAMT))) {
              activeStatusUpdate = false;
              dateCompletedUpdate = Timestamp.now();
            }
            await updateDoc(doc(db, `Organisations/${props.org}/Items/${props.item}`),
              {
                totalDonationCount: increment(1),
                totalDonationsValue: increment(props.watchPaidAMT),
                activeStatus: activeStatusUpdate,
                dateCompleted: dateCompletedUpdate,
              }
            );
            await updateDoc(doc(db, `Organisations/${props.org}`),
              {
                totalDonationCount: increment(1),
                totalItemDonationsCount: increment(1),
                totalDonationsValue: increment(props.watchPaidAMT),
                totalItemDonationsValue: increment(props.watchPaidAMT)
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
      {paypalDisplayed &&
        <PayPalButtons
          {...(props.watchSubscription ? { createSubscription: createSubscriptionContent } : { createOrder: createOrderContent })}
          {...(props.watchSubscription ? { style: { label: "subscribe", } } : { style: { label: "donate", } })}
          disabled={props.disabled}
          forceReRender={[purchaseData, props.watchPaidAMT, props.watchSubscription, props.formData]}
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
