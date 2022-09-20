// @ts-ignore
import { useForm } from "react-hook-form";
import "./DonorForm.css";
import Paypal from "./Paypal";

type DonorFormType = {
  paidAMT: number;
  monthly: boolean;
  name: string;
  phone: string;
  email: string;
  IsAnon: boolean;
  mailingList: boolean;
};

function DonorForm(props:any) {

  const isItemDonation = props.item !== undefined;

  const {
    watch,
    register,
    setValue,
    formState: { errors, isValid },
  } = useForm<DonorFormType>({
    mode: "onChange",
  });

  
  const watchPaidAMT = watch("paidAMT", 0);
  const watchSubscription = watch("monthly", false);

  const formDataValues=watch(); 

  const splitOrg = props.org;

  return (
    <div className="donorInfoContainer">
      <p>Your tax deductible contribution:</p>
      <br />
      <div className="presetButtons">
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
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
          {isItemDonation && <>
            <br />
            <button
              type="button"
              onClick={() => {
                setValue("paidAMT", props.itemAmount);
              }}
            >
              Full Amount
            </button>
          </>}

        </div>
      </div>
      <br />
      OR
      <form>
        <div>
          <div>
            {errors.paidAMT && <span>*</span>}
            <label>Enter an amount</label>
            {errors.paidAMT && (
              <span style={{ margin: "20px", fontSize: "x-small" }}>
                Please enter an amount
              </span>

            )}

            <input type="number"
              placeholder="Enter an amount"
              {...register("paidAMT", {
                required: true,
                pattern: /[1-9]/,
              })}

            />

          </div>


          {!isItemDonation &&
            <div>
              <label htmlFor="monthly">
                Let's make this a monthly payment!
              </label>
              <input type="checkbox" {...register("monthly")} />
            </div>
          }

          <br />

          <div>
            {errors.name && <span>*</span>}
            <label>Name</label>
            {errors.name && <span style={{ margin: "20px", fontSize: "x-small" }}>Name cannot be blank</span>}
            <input type="text"
              placeholder="Name"
              {...register("name", {
                required: true,
                pattern: /[a-z]/,
              })}
            />
          </div>
          <div>
            {errors.phone && <span>*</span>}
            <label>Phone</label>
            {errors.phone && <span style={{ margin: "20px", fontSize: "x-small" }}>Please enter a valid phone number</span>}
            <input
              placeholder="04XX XXX XXX"
              {...register("phone", {
                required: true,
                maxLength: 10,
                minLength: 10,
                pattern: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
                ,
              })}
            />
          </div>

          <div>
            {errors.email && <span>*</span>}
            <label>Email</label>
            {errors.email && <span style={{ margin: "20px", fontSize: "x-small" }}>Please enter a valid email</span>}
            <input type="email"
              placeholder="Email address"
              {...register("email", {
                required: true,
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              })}
            />
          </div>

          <div>
            <label htmlFor="IsAnon">Donate anonymously?</label>
            <input type="checkbox" value="yes" {...register("IsAnon")} />
          </div>

          <div style={{ paddingBottom: "10px" }}>
            <label htmlFor="mailingList">Join our mailing list?</label>
            <input type="checkbox" value="yes" {...register("mailingList")} />
          </div>


          {/* <input type="submit" /> */}
          <div style={{ minHeight: "150px" }}>

            <Paypal
              formData={formDataValues}
              watchPaidAMT={watchPaidAMT}
              watchSubscription={watchSubscription}
              org={splitOrg}
              disabled={!isValid}
              type={watchSubscription ? "subscription" : "capture"}
              item={props.item}
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default DonorForm;
