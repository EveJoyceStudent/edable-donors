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
      <Image
        className="banner"
        src="https://www.rd.com/wp-content/uploads/2021/01/GettyImages-1175550351.jpg"
      ></Image>
      <div
        className="msgContainer"
        style={{ height: "100vh", transform: "translate(0px,-45vh)" }}
      >
        <div>
          <Image
            className="msgIcon"
            src="https://c.tenor.com/04BE-ClaaBAAAAAC/cat-money.gif"
            roundedCircle
          ></Image>
          <h1 className="msgTitle">Thank You For Donating!</h1>
          { donationIdDisplay!=="" &&
          <h2 className="msgText">
            Donation Number: {donationIdDisplay}.
          </h2>
          }
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
      </div>
    </div>
  );
}

export default Success;
