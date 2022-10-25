import { Button, Image } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import "../DonorForm/Message.css";

function VolunteerError() {
  let params = useParams();
  return (
    //   these lines set up the format of the page
    <div className="bg">
      <div className="msgContainer" style={{ height: "calc(100vh - 40px)"}}>
        <div>
          <Image className="msgIcon" src='https://wompampsupport.azureedge.net/fetchimage?siteId=7575&v=2&jpgQuality=100&width=700&url=https%3A%2F%2Fi.kym-cdn.com%2Fentries%2Ficons%2Fmobile%2F000%2F028%2F692%2Fcat.jpg' roundedCircle></Image>
          <h1 className="msgTitle" style={{ paddingTop: "1vh" }}>
            Sorry, we couldn't complete your request.
          </h1>
          <h1 className="msgText">
            Would you like to...
            <br></br>
            <br></br>
            <Link to={`../../volunteer/organisation/${params.orgId}`}>
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
          </h1>

        </div>
      </div>
    </div>
    
  );
}

export default VolunteerError;