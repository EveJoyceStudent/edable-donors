import { useForm } from "react-hook-form";
import { doc, getDoc, addDoc, collection } from "firebase/firestore";
import { db } from "../config/firebase";

import "../styling/DonorForm.css";

function DonorForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const currentLoc = window.location.pathname;
  const splitOrg = currentLoc.slice(14);

  const onSubmit = handleSubmit(async (donor) => {
    try {
      const orgRef = await addDoc(
        collection(
          db,
          `Organisations/${splitOrg}/GeneralDonations/Summary/Donations`,
        ),
        {
          donor,
        },
      );
      console.log("it works", donor);
      window.alert("Thank you for your contribution!");
    } catch (e) {
      console.log("error");
    }
  });

  return (
    <div className="donorInfoContainer">
      <p>Your tax deductible contribution:</p>
      <br />
      <div className="presetButtons">
        <div>
          <button
            type="button"
            onClick={() => {
              setValue("paidAMT", "5");
            }}
          >
            $5
          </button>
          <button
            type="button"
            onClick={() => {
              setValue("paidAMT", "10");
            }}
          >
            $10
          </button>
          <button
            type="button"
            onClick={() => {
              setValue("paidAMT", "20");
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
            {errors.paidAMT && <span>*</span>}
            <label>Enter an amount</label>
            {errors.paidAMT && <span style={{ margin: "20px", fontSize: "x-small" }}>please donate more than $0</span>}
            <input
              placeholder="Enter an amount"
              {...register("paidAMT", { required: true })}
            />
          </div>

          <div>
            <label htmlFor="monthlyPayment">
              Let"s make this a monthly payment!
            </label>
            <input type="checkbox" value="yes" {...register("monthly")} />
          </div>

          <br />

          <div>
            {errors.name && <span>*</span>}
            <label>Name</label>
            {errors.name && <span style={{ margin: "20px", fontSize: "x-small" }}>must contain something???</span>}
            <input
              placeholder="Name"
              {...register("name", { required: true })}
            />
          </div>

          <div>
            {errors.phone && <span>*</span>}
            <label>Phone</label>
            {errors.phone && <span style={{ margin: "20px", fontSize: "x-small" }}>phone number must be 10 digits long or something idk how phone numbers work</span>}
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
            {errors.email && <span style={{ margin: "20px", fontSize: "x-small" }}>email must be an email</span>}
            <input
              type="email"
              placeholder="Email address"
              {...register("email", { required: true })}
            />
          </div>

          <div>
            <label htmlFor="donateAnon">Donate anonymously?</label>
            <input type="checkbox" value="yes" {...register("IsAnon")} />
          </div>

          <div>
            <label htmlFor="mailingList">Join our mailing list?</label>
            <input type="checkbox" value="yes" {...register("mailingList")} />
          </div>

          <input type="submit" />
        </div>
      </form>
    </div>
  );
}

export default DonorForm;

// submit button to direct to THANK U page
// validation for ENTER AMOUNT & PHONE (int)
