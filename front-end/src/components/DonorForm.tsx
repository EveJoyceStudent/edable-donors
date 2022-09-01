// @ts-ignore
import { useForm } from "react-hook-form";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../config/firebase";

import "../styling/DonorForm.css";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type DonorFormType = {
  paidAMT: number,
  monthly: boolean,
  name: string,
  phone: string,
  email: string,
  IsAnon: boolean,
  mailingList: boolean
}

function DonorForm(props:any) {
  let navigate = useNavigate();

  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<DonorFormType>({
    mode: "onChange"
  });

  const watchAllFields = watch();

  const [formData, setFormData] = useState<DonorFormType>({
    "paidAMT": 0,
    "monthly": false,
    "name": "",
    "phone": "",
    "email": "",
    "IsAnon": false,
    "mailingList": false
  });

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
    console.log(isValid);
  }, [isValid]);

  const watchPaidAMT = watch("paidAMT", 0);

  useEffect(() => {
    setPurchaseData({
      purchase_units: [
        {
          amount: {
            value: (watchPaidAMT).toString(),
          },
        },
      ],
    })
  }, [watchPaidAMT]);

  const splitOrg = props.org;

  const onSubmit = handleSubmit((donor: DonorFormType) => {
    try {
      setFormData(donor);
      console.log('set values');
    } catch (e) {
      console.log('error');
    }
  });

  return (
    //   these lines set up the format of the page
    <div id="donorInfoContainer">
      <p>Your tax deductible contribution:</p>
      <br />
      <div id="presetButtons">
        <div>
          <button
            type="button"
            onClick={() => {
              setValue("paidAMT", 5);
            }}
          >
            $5
          </button>
          <button
            type="button"
            onClick={() => {
              setValue("paidAMT", 10);
            }}
          >
            $10
          </button>
          <button
            type="button"
            onClick={() => {
              setValue("paidAMT", 20);
            }}
          >
            $20
          </button>
        </div>
      </div>
      <br />
      OR
      <form onSubmit={onSubmit}>
        <div>
          <div>
            {errors.paidAMT && <span>*</span>}<label>Enter an amount</label>
            <input
              placeholder="Enter an amount"
              {...register("paidAMT", { required: true })}
            />
          </div>

          <div>
            <label htmlFor="monthly">
              Let's make this a monthly payment!
            </label>
            <input type="checkbox" value="yes" {...register("monthly")} />
          </div>

          <br />

          <div>
            {errors.name && <span>*</span>}
            <label>Name</label>
            <input
              placeholder="Name"
              {...register("name", { required: true })}
            />
          </div>

          <div>
            {errors.phone && <span>*</span>}
            <label>Phone</label>
            <input
              type="tel"
              placeholder="04XX XXX XXX"
              {...register("phone", {
                required: true,
                maxLength: 10,
                minLength: 10,
                pattern: /[0-9]/,
              })}
            />
          </div>

          <div>
            {errors.email && <span>*</span>}
            <label>Email</label>
            <input
              type="email"
              placeholder="Email address"
              {...register("email", { required: true })}
            />
          </div>

          <div>
            <label htmlFor="IsAnon">Donate anonymously?</label>
            <input type="checkbox" value="yes" {...register("IsAnon")} />
          </div>


          <div>
            <label htmlFor="mailingList">Join our mailing list?</label>
            <input type="checkbox" value="yes" {...register("mailingList")} />
          </div>

          {/* <input type="submit" /> */}
          <PayPalButtons
            disabled={!isValid}
            forceReRender={[purchaseData]}
            // onInit={ (data, actions) => {
            //   return this.disabled=true;
            // }}
            onClick={(data, actions) => {
            }}
            createOrder={(data, actions) => {
              return actions.order.create(purchaseData);
            }
            }
            onApprove={async (data, actions) => {
              return actions.order!.capture().then(async (details) => {
                try {
                  const orgRef = await addDoc(collection(db, `Organisations/${splitOrg}/GeneralDonations/Summary/Donations`),
                    {
                      formData,
                    }
                  );
                  console.log("it works", orgRef);
                  const name = details.payer.name!.given_name;
                  alert(`Transaction completed by ${name}`);
                  navigate("../../success", { replace: true });
                  
                } catch (e) {
                  console.log('error');
                }
              });
            }}
          />
        </div>
      </form>

    </div>
  );
}

export default DonorForm;

// submit button to direct to THANK U page
// validation for ENTER AMOUNT & PHONE (int)
