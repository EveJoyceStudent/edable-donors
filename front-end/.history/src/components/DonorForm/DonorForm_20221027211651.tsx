// @ts-ignore
import { useState } from "react";
import { Button, Tooltip, OverlayTrigger } from "react-bootstrap";
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
  comment: string;
  howHeard: string;
  howHeardOther: string;
};

function DonorForm(props: any) {
  const [showOption, setShowOption] = useState(false);

  const [proceedFlag, setProceedFlag] = useState(false);
  const [formAttemptedIncomplete, setFormAttemptedIncomplete] = useState(false);

  const isItemDonation = props.item !== undefined;

  const anonTooltip = (props: any) => (
    <Tooltip {...props}>
      We still require your name but it will not show on our site
    </Tooltip>
  );
  const amountTooltip = (props: any) => (
    <Tooltip {...props}>
      All donations made are in AUD and must be a whole number amount
    </Tooltip>
  );

  const {
    getValues,
    register,
    setValue,
    formState: { errors, isValid },
  } = useForm<DonorFormType>({
    mode: "onChange",
  });

  const [formDataSave, setFormDataSave] = useState<DonorFormType>(getValues());

  const splitOrg = props.org;

  const proceed = () => {
    if (!isValid) {
      setFormAttemptedIncomplete(true);
    } else {
      setFormDataSave(getValues());
      setProceedFlag(true);
    }
  };
  const returnToForm = () => {
    setProceedFlag(false);
  };

  return (
    <div className="donorInfoContainer">
      <div>
        <p>Your tax deductible contribution</p>
        {!proceedFlag && (
          <>
            <div className="presetButtons">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <button
                  type="button"
                  onClick={() => {
                    setValue("paidAMT", 5, { shouldValidate: true });
                  }}
                >
                  $5
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setValue("paidAMT", 10, { shouldValidate: true });
                  }}
                >
                  $10
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setValue("paidAMT", 20, { shouldValidate: true });
                  }}
                >
                  $20
                </button>
                {isItemDonation && (
                  <>
                    <br />
                    <button
                      type="button"
                      onClick={() => {
                        setValue("paidAMT", props.itemAmount, {
                          shouldValidate: true,
                        });
                      }}
                    >
                      Full Amount
                    </button>
                  </>
                )}
              </div>
            </div>
            <br />
            OR
            <form>
              <div>
                <div className="Amount">
                  {errors.paidAMT && <span>*</span>}
                  <OverlayTrigger placement="top" overlay={amountTooltip}>
                    <label>
                      ENTER AN AMOUNT<sup>(ℹ️)</sup>
                    </label>
                  </OverlayTrigger>
                  {errors.paidAMT && (
                    <span style={{ margin: "20px", fontSize: "x-small" }}>
                      Please enter an amount
                    </span>
                  )}

                  <input
                    type="number"
                    placeholder="Enter an amount"
                    {...register("paidAMT", {
                      min: 1,
                      required: true,
                      pattern: /^[-\d]\d*$/,
                    })}
                  />
                </div>

                {!isItemDonation && (
                  <div>
                    <label htmlFor="monthly">
                      Let's make this a monthly payment!
                    </label>
                    <input type="checkbox" {...register("monthly")} />
                  </div>
                )}

                <br />

                <div>
                  {errors.name && <span>*</span>}
                  <label>Name</label>
                  {errors.name && (
                    <span style={{ margin: "20px", fontSize: "x-small" }}>
                      Name cannot be blank
                    </span>
                  )}
                  <input
                    type="text"
                    placeholder="Name"
                    {...register("name", {
                      required: true,
                      pattern: /^[a-zA-Z0-9]/,
                    })}
                  />
                </div>
                <div>
                  {errors.phone && <span>*</span>}
                  <label>Phone</label>
                  {errors.phone && (
                    <span style={{ margin: "20px", fontSize: "x-small" }}>
                      Please enter a valid phone number
                    </span>
                  )}
                  <input
                    placeholder="04XX XXX XXX"
                    {...register("phone", {
                      required: true,
                      maxLength: 10,
                      minLength: 10,
                      pattern:
                        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
                    })}
                  />
                </div>

                <div>
                  {errors.email && <span>*</span>}
                  <label>Email</label>
                  {errors.email && (
                    <span style={{ margin: "20px", fontSize: "x-small" }}>
                      Please enter a valid email
                    </span>
                  )}
                  <input
                    type="email"
                    placeholder="Email address"
                    {...register("email", {
                      required: true,
                      pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    })}
                  />
                </div>

                <div className="IsAnon">
                  <OverlayTrigger placement="top" overlay={anonTooltip}>
                    <label htmlFor="IsAnon">
                      Donate anonymously?<sup>(ℹ️)</sup>
                    </label>
                  </OverlayTrigger>
                  <input type="checkbox" value="yes" {...register("IsAnon")} />
                </div>

                <div style={{ paddingBottom: "10px" }}>
                  <label htmlFor="mailingList">Join our mailing list?</label>
                  <input
                    type="checkbox"
                    value="yes"
                    {...register("mailingList")}
                  />
                </div>

                <div>
                  <label>Comment (optional)</label>
                  <input
                    type="text"
                    placeholder="Add a comment to your donation"
                    {...register("comment")}
                  />
                </div>
                <div>
                  <label>How did you hear about us? (optional)</label>
                  <select
                    {...register("howHeard")}
                    className="input"
                    id="designation"
                    onChange={(e) => {
                      if (e.target.value === "Other") setShowOption(true);
                      else setShowOption(false);
                    }}
                  >
                    <option style={{ display: "none" }} value="">
                      Please Select
                    </option>
                    <option value="WordOfMouth">Word of Mouth</option>
                    <option value="Facebook">Facebook</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {showOption ? (
                  <div className="field">
                    <label className="label">
                      How did you find out about us
                    </label>
                    <div className="control ">
                      <input
                        {...register("howHeardOther")}
                        className="input"
                        type="text"
                        placeholder="Other"
                      />
                    </div>
                  </div>
                ) : (
                  ""
                )}

                <div
                  style={{
                    marginTop: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  {!isValid && formAttemptedIncomplete && (
                    <div>Please complete the form.</div>
                  )}
                  <Button
                    className="proceedPayBtn"
                    variant="warning"
                    onClick={proceed}
                  >
                    Proceed to Payment
                  </Button>
                </div>
              </div>
            </form>
          </>
        )}

        {proceedFlag && (
          <>
            <div>
              <div>Hi {formDataSave.name},</div>
              <div>
                You're{" "}
                {formDataSave.monthly
                  ? `setting up a${
                      formDataSave.IsAnon ? "n anonymous" : ""
                    } monthly subscription`
                  : `making a${
                      formDataSave.IsAnon ? "n anonymous" : ""
                    } one-off donation`}{" "}
                of ${formDataSave.paidAMT}
              </div>
              {formDataSave.comment && (
                <div>{`With comment "${formDataSave.comment}"`}</div>
              )}
              <div>Email: {formDataSave.email}</div>
              <div>Phone: {formDataSave.phone}</div>
            </div>
            <div style={{ minHeight: "150px" }}>
              <Paypal
                formData={formDataSave}
                watchPaidAMT={formDataSave.paidAMT}
                watchSubscription={formDataSave.monthly}
                org={splitOrg}
                disabled={!isValid}
                type={formDataSave.monthly ? "subscription" : "capture"}
                item={props.item}
                orgName={props.orgName}
                itemName={props.itemName}
                itemOrgName={props.itemOrgName}
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button variant="outline-secondary" onClick={returnToForm}>
                Something looks wrong, edit my donation
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default DonorForm;
