// @ts-ignore
import { useForm } from "react-hook-form";
import "./DonorForm.css";
import Paypal from "./Paypal";

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

  const {
    watch,
    register,
    setValue,
    formState: { errors, isValid },
  } = useForm<DonorFormType>({
    mode: "onChange"
  });

  const watchPaidAMT = watch("paidAMT", 0);

  const watchData=watch(); 

  const splitOrg = props.org;

  return (
    <div className="donorInfoContainer">
      <p>Your tax deductible contribution:</p>
      <br />
      <div className="presetButtons">
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
      <form>
        <div>
          <div>
            {errors.paidAMT && <span>*</span>}
            <label>Enter an amount</label>
            {errors.paidAMT && <span style={{ margin: "20px", fontSize: "x-small" }}>Must contain a number</span>}
            <input
              placeholder="Enter an amount"
              {...register("paidAMT", { 
                required: true,
                pattern: /[0-9]/, })}
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
            {errors.name && <span style={{ margin: "20px", fontSize: "x-small" }}>Name cannot be blank, must contain letters</span>}
            <input
              placeholder="Name"
              {...register("name", { 
                required: true,
                pattern: /[a-z]/, })}
            />
          </div>

          <div>
            {errors.phone && <span>*</span>}
            <label>Phone</label>
            {errors.phone && <span style={{ margin: "20px", fontSize: "x-small" }}>Phone number must be 10 digits in length and cannot include letters</span>}
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
            {errors.email && <span style={{ margin: "20px", fontSize: "x-small" }}>Must contain a valid email</span>}
            <input
              type="email"
              placeholder="Email address"
              {...register("email", { 
                required: true })}
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
          <Paypal
            formData={watchData}
            watchPaidAMT={watchPaidAMT}
            org={splitOrg}
            disabled={!isValid}
          />
        </div>
      </form>
    </div>
  );
}

export default DonorForm;

