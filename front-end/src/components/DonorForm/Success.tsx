import { Link, useLocation } from "react-router-dom";
import { Image, Button } from "react-bootstrap";
import "./Message.css";
import { useEffect, useState } from "react";

type DonationInfoType = {
  donationID: string;
};

function Success() {
  let locationData = useLocation().state as DonationInfoType;
  
  const [donationIdDisplay, setDonationIdDisplay] = useState("");
  
  useEffect(() => {
    if(locationData){setDonationIdDisplay(locationData.donationID);}
  }, [locationData]);

  return (
    //   these lines set up the format of the page
    <div className="bg">
      <div className="banner">
      </div>
      <div
        className="msgContainer"
        style={{ transform: "translate(0px,-45vh)" }}
      >
        <div>
          {/* // insert organisation logo // */}
          <Image
            className="msgIcon"
            src="https://c.tenor.com/04BE-ClaaBAAAAAC/cat-money.gif"
            roundedCircle
          ></Image>
          {donationIdDisplay !== "" &&
            <div>
              <h1 className="msgTitle">Thank you for donating!</h1>

              <h2 className="msgText">
                Donation Number: {donationIdDisplay}.
              </h2>
              <h2 className="msgText">
                An email with your receipt will be sent to you.
              </h2>
              <h2 className="msgText">
                If you cannot find the email, please check your spam box.
              </h2>
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
          }
          {donationIdDisplay == "" &&
            <div>
              <h1 className="msgTitle">Thank you for volunteering!</h1>
              <h2 className="msgText">
                An email with your details will be sent to you.
              </h2>
              <h2 className="msgText">
                If you cannot find the email, please check your spam box.
              </h2>
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
          }  
        </div>
      </div>
    </div>
  );
}

export default Success;
