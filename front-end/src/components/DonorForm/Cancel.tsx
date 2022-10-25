import { Button, Image } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import "./Message.css";
import { ReactComponent as EdAbleStar } from "./EdAbleStar.svg";

function Cancel() {
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
          <Link to={`../../organisation/${params.orgId}`}>
            <Button className="msgButton" variant="warning">
              <i>Try Again</i>
            </Button>
          </Link>
          &nbsp;&nbsp;or&nbsp;&nbsp;
          <Link to="/">
            <Button className="msgButton" variant="warning">
              <i>Return to Donation page</i>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cancel;
