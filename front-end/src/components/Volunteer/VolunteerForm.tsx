// @ts-ignore
import { useState } from "react";
import {
  Button,
  Tooltip,
  OverlayTrigger,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import "../DonorForm/DonorForm.css";

type VolunteerFormType = {
  volunteerName: string;
  volunteerPhone: number;
  volunteerEmail: string;
  volunteerOrgName: string;
  volunteerDOB: Date;
  volunteerVolunteerAmount: number;
  volunteerHours: number;
  volunteerPostcode: number;
  Monday: string;
  Tuesday: string;
  Wednesday: string;
  Thursday: string;
  Friday: string;
  Saturday: string;
  Sunday: string;
  Skills: string;
  volunteerComment: string;
};

function VolunteerForm(props: any) {
  const {
    getValues,
    register,

    formState: { errors, isValid },
  } = useForm<VolunteerFormType>({
    mode: "onChange",
  });
  const [showOption, setShowOption] = useState(false);
  const [formDataSave, setFormDataSave] = useState<VolunteerFormType>(
    getValues()
  );
  const [formAttemptedIncomplete, setFormAttemptedIncomplete] = useState(false);
  const [proceedFlag, setProceedFlag] = useState(false);

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
    <div className="VolunteerInfoContainer">
      <div>
        <p>I would like to volunteer!</p>
        <form>
          <div>
            {errors.volunteerName && <span>*</span>}
            <label>Name</label>
            {errors.volunteerName && (
              <span style={{ margin: "20px", fontSize: "x-small" }}>
                Name cannot be blank
              </span>
            )}
            <input
              type="text"
              placeholder="Name"
              {...register("volunteerName", {
                required: true,
                pattern: /^[a-zA-Z0-9]/,
              })}
            />
          </div>

          <div>
            <label>Registering on behalf of an organisation?</label>
            <input type="checkbox" id="isOrg" value="yes" />
            <div className="volunteerOrgInfo">
              <div>
                {/* {errors.volunteerOrgName && <span>*</span>} */}
                <label>Name of Organisation</label>
                {/* {errors.volunteerOrgName && ( */}
                <span style={{ margin: "20px", fontSize: "x-small" }}>
                  Name cannot be blank
                </span>
                {/* )} */}
                <input
                  type="text"
                  placeholder="Name of Organisation"
                  {...register("volunteerOrgName", {
                    required: true,
                    pattern: /^[a-zA-Z0-9]/,
                  })}
                />
              </div>

              <div>
                {/* {errors.volunteerVolunteerAmount && <span>*</span>} */}
                <label>Number of Volunteers</label>
                {/* {errors.volunteerVolunteerAmount && ( */}
                <span style={{ margin: "20px", fontSize: "x-small" }}>
                  Number of volunteers cannot be blank
                </span>
                {/* )} */}
                <input
                  type="number"
                  placeholder="Enter an amount"
                  {...register("volunteerVolunteerAmount", {
                    required: true,
                    pattern: /[1-9]/,
                  })}
                />
              </div>
            </div>

            <div className="DOB">
              <label>Date of Birth</label>
              <input type="date"></input>
            </div>
          </div>

          <div>
            {errors.volunteerPhone && <span>*</span>}
            <label>Phone</label>
            {errors.volunteerPhone && (
              <span style={{ margin: "20px", fontSize: "x-small" }}>
                Please enter a valid phone number
              </span>
            )}
            <input
              placeholder="04XX XXX XXX"
              {...register("volunteerPhone", {
                required: true,
                maxLength: 10,
                minLength: 10,
                pattern:
                  /^[/+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
              })}
            />
          </div>

          <div>
            {errors.volunteerEmail && <span>*</span>}
            <label>Email</label>
            {errors.volunteerEmail && (
              <span style={{ margin: "20px", fontSize: "x-small" }}>
                Please enter a valid email
              </span>
            )}
            <input
              placeholder="Email address"
              {...register("volunteerEmail", {
                required: true,
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              })}
            />
          </div>

          <div>
            {errors.volunteerPostcode && <span>*</span>}
            <label>Postcode</label>
            {errors.volunteerPostcode && (
              <span style={{ margin: "20px", fontSize: "x-small" }}>
                Please enter an amount
              </span>
            )}
            <input
              type="number"
              placeholder="0000"
              {...register("volunteerPostcode", {
                required: true,
                pattern: /[1-9]/,
              })}
            />
          </div>
          <hr />

          <div className="volunteerHours">
            {errors.volunteerHours && <span>*</span>}
            <label>Hours Available</label>
            {errors.volunteerHours && (
              <span style={{ margin: "20px", fontSize: "x-small" }}>
                Please enter an amount
              </span>
            )}
            <input
              type="number"
              placeholder="0"
              {...register("volunteerHours", {
                required: true,
                pattern: /[1-9]/,
              })}
            />
          </div>

          <div>
            <label>Days Available</label>
            <div className="availablity">
              <Container style={{ textAlign: "center" }}>
                <Row>
                  <Col>
                    <label>Monday</label>
                    <input
                      type="checkbox"
                      id="Monday"
                      {...register("Monday")}
                    ></input>
                  </Col>
                  <Col>
                    <label>Tuesday</label>
                    <input
                      type="checkbox"
                      id="Tuesday"
                      {...register("Tuesday")}
                    ></input>
                  </Col>
                  <Col>
                    <label>Wednesday</label>
                    <input
                      type="checkbox"
                      id="Wednesday"
                      {...register("Wednesday")}
                    ></input>
                  </Col>
                  <Col>
                    <label>Thursday</label>
                    <input
                      type="checkbox"
                      id="Thursday"
                      {...register("Thursday")}
                    ></input>
                  </Col>
                  <Col>
                    <label>Friday</label>
                    <input
                      type="checkbox"
                      id="Friday"
                      {...register("Friday")}
                    ></input>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <label>Saturday</label>
                    <input
                      type="checkbox"
                      id="Saturday"
                      {...register("Saturday")}
                    ></input>
                  </Col>
                  <Col>
                    <label>Sunday</label>
                    <input
                      type="checkbox"
                      id="Sunday"
                      {...register("Sunday")}
                    ></input>
                  </Col>
                </Row>
              </Container>
            </div>
          </div>
          <div>
            <label>How would you like to contribute?</label>
            <input type="text" placeholder="What would you like to do?" />
          </div>
          <div>
            <label>Skills (optional)</label>
            <input
              type="text"
              placeholder="List your skills"
              {...register("Skills")}
            ></input>
          </div>
          <div>
            <label>Comment (optional)</label>
            <input
              type="text"
              placeholder="Add a comment to your donation"
              {...register("volunteerComment")}
            />
            <label>How did you hear about us? (optional)</label>
            <select
              // {...register("volunteerHowHeard")}
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
              <label className="label">How did you find out about us</label>
              <div className="control ">
                <input
                  // {...register("volunteerHowHeardOther")}
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
            <Button variant="warning" onClick={proceed}>
              Register your interest
            </Button>
          </div>
        </form>

        {proceedFlag && (
          <>
            <p style={{ fontSize: "1vw" }}>
              <div>Hi {formDataSave.volunteerName},</div>
              <div>You're of ${formDataSave.volunteerVolunteerAmount}</div>
              {formDataSave.volunteerComment && (
                <div>{`With comment "${formDataSave.volunteerComment}"`}</div>
              )}
              <div>Email: {formDataSave.volunteerEmail}</div>
              <div>Phone: {formDataSave.volunteerPhone}</div>
            </p>
            <div style={{ minHeight: "150px" }}></div>
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
export default VolunteerForm;
