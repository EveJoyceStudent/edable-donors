// @ts-ignore
import { useState } from "react";
import {
  Button,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import "../DonorForm/DonorForm.css";
import { db } from "../../config/firebase";
import {

  collection,
  doc,
  setDoc,

} from "firebase/firestore";
import axios from "axios";
type VolunteerFormType = {
  isOrg: boolean;
  volunteerName: string;
  volunteerPhone: number;
  volunteerEmail: string;
  volunteerOrgName: string;
  volunteerDOB: Date;
  volunteerAmount: number;
  volunteerHours: number;
  volunteerPostcode: number;
  volunteerComment: string;
  volunteerHowHeard: string;
  volunteerHowHeardOther: string;
  howContribute: string;
  Monday: boolean;
  Tuesday: boolean;
  Wednesday: boolean;
  Thursday: boolean;
  Friday: boolean;
  Saturday: boolean;
  Sunday: boolean;
  Skills: string;
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

  const volunteerDonate = async () => {
    // console.log(getValues().volunteerDOB)
    const docRef = doc(collection(db, `Organisations/${props.orgId}/VolunteerDonations`));

    await setDoc(docRef, ({

      volunteerName: getValues().volunteerName,
      volunteerPhone: getValues().volunteerPhone,
      volunteerEmail: getValues().volunteerEmail,
      volunteerOrgName: getValues().volunteerOrgName,
      volunteerDOB: getValues().volunteerDOB,
      volunteerAmount: getValues().volunteerAmount,
      volunteerHours: getValues().volunteerHours,
      volunteerPostcode: getValues().volunteerPostcode,
      volunteerComment: getValues().volunteerComment,
      volunteerHowHeard: getValues().volunteerHowHeard,
      howContribute: getValues().howContribute,
      Monday: getValues().Monday,
      Tuesday: getValues().Tuesday,
      Wednesday: getValues().Wednesday,
      Thursday: getValues().Thursday,
      Friday: getValues().Friday,
      Saturday: getValues().Saturday,
      Sunday: getValues().Sunday,
    }
    )
    );

    const generalURL =
      `${process.env.REACT_APP_API_URL}mail/volunteer-info`;
    axios
      .post(generalURL, {
        orgName: props.orgName,
        name: getValues().volunteerName,
        organisationFlag: getValues().isOrg,
        organisationName: getValues().volunteerOrgName,
        numVolunteers: getValues().volunteerAmount,
        individualFlag: !(getValues().isOrg),
        dob: getValues().volunteerDOB,
        phone: getValues().volunteerPhone,
        email: getValues().volunteerEmail,
        postcode: getValues().volunteerPostcode,
        hours: getValues().volunteerHours,
        monday: getValues().Monday,
        tuesday: getValues().Tuesday,
        wednesday: getValues().Wednesday,
        thursday: getValues().Thursday,
        friday: getValues().Friday,
        saturday: getValues().Saturday,
        sunday: getValues().Sunday,

        howContribute: getValues().howContribute,
        skills: getValues().Skills,
        comment: getValues().volunteerComment,
        howHeard: getValues().volunteerHowHeard,
        howHeardOther: getValues().volunteerHowHeardOther,
      })
      .then((response) => {
      })
      .catch((error) => {
        console.log(error);
      });


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
            <input type="checkbox" id="isOrg" {...register("isOrg")} />
            <div className="volunteerOrgInfo">
              <div>
                <label>Name of Organisation</label>
                {/* <span style={{ margin: "20px", fontSize: "x-small" }}>
                Name cannot be blank
              </span> */}
                {/* )} */}
                <input
                  type="text"
                  placeholder="Name of Organisation"
                  {...register("volunteerOrgName", {
                    pattern: /^[a-zA-Z0-9]/,
                  })}
                />
              </div>

              <div>
                {/* {errors.volunteerVolunteerAmount && <span>*</span>} */}
                <label>Number of Volunteers</label>
                {/* {errors.volunteerVolunteerAmount && ( */}
                {/* <span style={{ margin: "20px", fontSize: "x-small" }}>
                Number of volunteers cannot be blank
              </span> */}
                {/* )} */}
                <input
                  type="number"
                  placeholder="Enter an amount"
                  {...register("volunteerAmount", {
                    pattern: /[1-9]/,
                  })}
                />
              </div>
            </div>

            <div className="DOB">
              <label>Date of Birth</label>
              <input type="date"
                {...register("volunteerDOB")}
              />
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
                Please enter a valid Postcode
              </span>
            )}
            <input
              type="number"
              placeholder="0000"
              {...register("volunteerPostcode", {
                required: true,
                maxLength: 4,
                minLength: 4,
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
            {errors.howContribute && <span>*</span>}
            <label>How would you like to contribute?</label>
            {errors.howContribute && (
              <span style={{ margin: "20px", fontSize: "x-small" }}>
                Contribution cannot be blank
              </span>
            )}
            <input
              type="text"
              placeholder="What would you like to do?"
              {...register("howContribute", {
                required: true,
              })}
            />

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
              {...register("volunteerHowHeard")}
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
                  {...register("volunteerHowHeardOther")}
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
              <div>You're volunteering {formDataSave.volunteerAmount} people</div>
              {formDataSave.volunteerComment && (
                <div>{`With comment "${formDataSave.volunteerComment}"`}</div>
              )}
              <div>Email: {formDataSave.volunteerEmail}</div>
              <div>Phone: {formDataSave.volunteerPhone}</div>
              <div>You would like to help by {formDataSave.howContribute}</div>
              <div>Skills: {formDataSave.Skills}</div>
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
              <Button variant="outline-secondary" onClick={volunteerDonate}>
                Looks good, send in my application!
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
export default VolunteerForm;
