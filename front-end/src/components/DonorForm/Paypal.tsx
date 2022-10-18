// @ts-ignore
import {
  addDoc,
  collection,
  doc,
  getDoc,
  increment,
  runTransaction,
  setDoc,
  Timestamp,
  Transaction,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Paypal(props: any) {
  const [{ options }, dispatch] = usePayPalScriptReducer();

  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        intent: props.type,
        vault: props.watchSubscription,
      },
    });
  }, [props.type, props.watchSubscription]);

  let navigate = useNavigate();

  const [paypalDisplayed, setPaypalDisplayed] = useState(true);

  const paypalDisabledNavigate = (link: string, donationID: string) => {
    setPaypalDisplayed(false);
    navigate(link, { state: { donationID: donationID } });
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
        soft_descriptor: "donation",
      },
    ],
  });

  useEffect(() => {
    setPurchaseData({
      purchase_units: [
        {
          amount: {
            value: props.watchPaidAMT.toString(),
            breakdown: {
              item_total: {
                currency_code: "AUD",
                value: props.watchPaidAMT.toString(),
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
                value: props.watchPaidAMT.toString(),
              },
              category: "DONATION",
            },
          ],
          soft_descriptor: "donation",
        },
      ],
    });
  }, [props.watchPaidAMT]);

  const createSubscriptionContent = (data: any, actions: any) => {
    return actions.subscription.create({
      plan_id: process.env.REACT_APP_PAYPAL_SUBSCRIPTION_PLAN_ID,
      quantity: Math.floor(props.watchPaidAMT),
    });
  };

  const createOrderContent = (data: any, actions: any) => {
    return actions.order.create(purchaseData);
  };
  const generalURL = `${process.env.REACT_APP_API_URL}mail/general`;
  function sendGeneralDonationEmail(paypalId: string) {
    axios
      .post(generalURL, {
        amount: Number(props.formData.paidAMT),
        name: props.formData.name,
        donationType: props.formData.monthly,
        donorEmail: props.formData.email,
        orgName: props.orgName,
        paypalTransactionId: paypalId,
        phoneNumber: props.formData.phone,
      })
      .then((response) => {})
      .catch((error) => {
        console.log(error);
      });
  }
  const itemURL = `${process.env.REACT_APP_API_URL}mail/item`;

  function sendItemDonationEmail(paypalId: string) {
    axios
      .post(itemURL, {
        amount: Number(props.formData.paidAMT),
        name: props.formData.name,
        donorEmail: props.formData.email,
        itemName: props.itemName,
        itemOrgName: props.itemOrgName,
        paypalTransactionId: paypalId,
        phoneNumber: props.formData.phone,
      })
      .then((response) => {})
      .catch((error) => {
        console.log(error);
      });
  }
  const generalDonationTransactions = async (
    subscription: boolean,
    paypalId: string
  ) => {
    await runTransaction(db, async (transaction) => {
      // update publicly accessible donation data
      const newDonationRef = doc(
        collection(db, `Organisations/${props.org}/GeneralDonations`)
      );
      transaction.set(newDonationRef, {
        donorPublicName: props.formData.IsAnon
          ? "Anonymous"
          : props.formData.name,
        amount: Number(props.watchPaidAMT),
        IsRefunded: false,
        IsSubscribed: subscription,
        comment: props.formData.comment,
        donationDate: Timestamp.now(),
      });
      // const orgRef = await addDoc(
      //   collection(db, `Organisations/${props.org}/GeneralDonations`),
      //   {
      //     donorPublicName: props.formData.IsAnon
      //       ? "Anonymous"
      //       : props.formData.name,
      //     amount: props.watchPaidAMT,
      //     IsRefunded: false,
      //     IsSubscribed: subscription,
      //     comment: props.formData.comment,
      //     donationDate: Timestamp.now(),
      //   }
      // );
      // update private donation data
      transaction.set(
        doc(
          db,
          `Organisations/${props.org}/GeneralDonations/${newDonationRef.id}/Private`,
          "Private"
        ),
        {
          paypalTransactionId: paypalId,
          name: props.formData.name,
          email: props.formData.email,
          phoneNumber: props.formData.phone,
          mailingAddress: "",
          IsAnon: Boolean(props.formData.IsAnon),
          agreeToContact: Boolean(props.formData.mailingList),
          howHeard: props.formData.howHeard,
          howHeardOther: props.formData.howHeardOther
            ? props.formData.howHeardOther
            : "",
        }
      );
      // update donation summaries
      transaction.update(doc(db, `Organisations/${props.org}`), {
        totalDonationCount: increment(1),
        totalGeneralDonationsCount: increment(1),
        totalDonationsValue: increment(Number(props.watchPaidAMT)),
        totalGeneralDonationsValue: increment(Number(props.watchPaidAMT)),
      });
    });
    sendGeneralDonationEmail(paypalId);
  };

  const approveSubscriptionContent = async (data: any, actions: any) => {
    return actions.subscription?.get().then(async (details: any) => {
      try {
        await generalDonationTransactions(true, details.id);
        paypalDisabledNavigate("../../success", details.id);
      } catch (e) {
        console.log("error", e);
        throw new Error("approval error");
      }
    });
  };

  const approveOrderContent = async (data: any, actions: any) => {
    if (!props.item) {
      return actions.order.capture().then(async (details: any) => {
        try {
          await generalDonationTransactions(
            false,
            details.purchase_units[0].payments.captures[0].id
          );
          paypalDisabledNavigate(
            "../../success",
            details.purchase_units[0].payments.captures[0].id
          );
        } catch (e) {
          console.log("error", e);
          throw new Error("approval error");
        }
      });
    } else {
      return actions.order.capture().then(async (details: any) => {
        try {
          await runTransaction(db, async (transaction) => {
            // first check if this donation will complete the donations to an item and disactivate if complete
            const itemSummary = await transaction.get(
              doc(db, `Organisations/${props.org}/Items/${props.item}`)
            );
            let activeStatusUpdate = itemSummary.data()!.activeStatus;
            let dateCompletedUpdate = itemSummary.data()!.dateCompleted;
            if (
              itemSummary.data()!.initialPrice <=
              itemSummary.data()!.totalDonationsValue +
                Number(props.watchPaidAMT)
            ) {
              activeStatusUpdate = false;
              dateCompletedUpdate = Timestamp.now();
            }
            // update publicly accessible donation data
            const newDonationRef = doc(
              collection(
                db,
                `Organisations/${props.org}/Items/${props.item}/ItemsDonations`
              )
            );
            transaction.set(newDonationRef, {
              donorPublicName: props.formData.IsAnon
                ? "Anonymous"
                : props.formData.name,
              amount: Number(props.watchPaidAMT),
              IsRefunded: false,
              comment: props.formData.comment,
              donationDate: Timestamp.now(),
            });
            // update private donation data
            transaction.set(
              doc(
                db,
                `Organisations/${props.org}/Items/${props.item}/ItemsDonations/${newDonationRef.id}/Private`,
                "Private"
              ),
              {
                paypalTransactionId:
                  details.purchase_units[0].payments.captures[0].id,
                name: props.formData.name,
                email: props.formData.email,
                phoneNumber: props.formData.phone,
                mailingAddress: "",
                IsAnon: Boolean(props.formData.IsAnon),
                agreeToContact: Boolean(props.formData.mailingList),
                howHeard: props.formData.howHeard,
                howHeardOther: props.formData.howHeardOther
                  ? props.formData.howHeardOther
                  : "",
              }
            );

            // update donation summaries

            transaction.update(
              doc(db, `Organisations/${props.org}/Items/${props.item}`),
              {
                totalDonationCount: increment(1),
                totalDonationsValue: increment(Number(props.watchPaidAMT)),
                activeStatus: activeStatusUpdate,
                dateCompleted: dateCompletedUpdate,
              }
            );
            transaction.update(doc(db, `Organisations/${props.org}`), {
              totalDonationCount: increment(1),
              totalItemDonationsCount: increment(1),
              totalDonationsValue: increment(Number(props.watchPaidAMT)),
              totalItemDonationsValue: increment(Number(props.watchPaidAMT)),
            });
          });
          sendItemDonationEmail(
            details.purchase_units[0].payments.captures[0].id
          );

          paypalDisabledNavigate(
            "../../success",
            details.purchase_units[0].payments.captures[0].id
          );
        } catch (e) {
          console.log("error", e);
          throw new Error("approval error");
        }
      });
    }
  };

  return (
    <>
      {paypalDisplayed && (
        <PayPalButtons
          {...(props.watchSubscription
            ? { createSubscription: createSubscriptionContent }
            : { createOrder: createOrderContent })}
          {...(props.watchSubscription
            ? { style: { label: "subscribe" } }
            : { style: { label: "donate" } })}
          disabled={props.disabled}
          forceReRender={[
            purchaseData,
            props.watchPaidAMT,
            props.watchSubscription,
            props.formData,
          ]}
          onCancel={(data, actions) => {
            return paypalDisabledNavigate(`../../cancel/${props.org}`, "");
          }}
          onError={(err) => {
            window.alert(err);
            return paypalDisabledNavigate(`../../cancel/${props.org}`, "");
          }}
          {...(props.watchSubscription
            ? { onApprove: approveSubscriptionContent }
            : { onApprove: approveOrderContent })}
        />
      )}
    </>
  );
}

export default Paypal;

// submit button to direct to THANK U page
// validation for ENTER AMOUNT & PHONE (int)
