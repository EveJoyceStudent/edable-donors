import { Button, Image } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import "../DonorForm/Message.css";
import { ReactComponent as EdAbleStar } from "../DonorForm/EdAbleStar.svg";

function VolunteerError() {
  let params = useParams();
  return (
    <div className="bg">
      <div className="msgContainer">
        <div>
          <EdAbleStar className="EdAbleStar" />
          <p className="msgText" style={{ fontSize: "calc(5vw-1vw" }}>
            Sorry, we couldn't complete your transaction.
            <br />
            Would you like to...
          </p>
          <br />
          <Link to={`../../volunteer/organisation/${params.orgId}`}>
            <Button className="msgButton" variant="warning">
              <i>Try Again</i>
            </Button>
          </Link>
          &nbsp;&nbsp;or&nbsp;&nbsp;
          <Link to="/volunteer">
            <Button className="msgButton" variant="warning">
              <i>Return to Volunteer page</i>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default VolunteerError;