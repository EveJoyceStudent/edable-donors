import { Link, useLocation } from "react-router-dom";
import { Image, Button } from "react-bootstrap";
import "./Message.css";
import { useEffect, useState } from "react";
import { ReactComponent as EdAbleStar } from "./EdAbleStar.svg";

type DonationInfoType = {
  donationID: string;
};

function Success() {
  let locationData = useLocation().state as DonationInfoType;

  const [donationIdDisplay, setDonationIdDisplay] = useState("");

  useEffect(() => {
    if (locationData) {
      setDonationIdDisplay(locationData.donationID);
    }
  }, [locationData]);

  return (
    //   these lines set up the format of the page
    <div className="bg">
      <div className="msgContainer">
        <div>
          <EdAbleStar className="EdAbleStar" />
          {donationIdDisplay !== "" && (
            <div>
              <p className="msgTitle" style={{ fontSize: "calc(5vw-1vw" }}>
                Thank you for donating!
              </p>
              <br />
              <p className="msgText">Donation Number: {donationIdDisplay}.</p>
              <br />
              <p className="msgText">
                An email with your receipt will be sent to you.
                <br />
                If you cannot find the email, please check your spam box.
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Link to="/">
                  <Button className="msgButton" variant="warning">
                    <i>Why not donate again?</i>
                  </Button>
                </Link>
              </div>
            </div>
          )}
          {donationIdDisplay == "" && (
            <div>
              <p className="msgTitle">Thank you for volunteering!</p>
              <p className="msgText">
                An email with your details will be sent to you.
              </p>
              <p className="msgText">
                If you cannot find the email, please check your spam box.
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Link to="/volunteer">
                  <Button className="msgButton" variant="warning">
                    <i>Why not volunteer again?</i>
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Success;
