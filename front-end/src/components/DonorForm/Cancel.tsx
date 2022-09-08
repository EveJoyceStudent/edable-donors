import { Button, Image } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

function Cancel() {
  let params = useParams();
  return (
    //   these lines set up the format of the page
    <div style={{ textAlign: "center", width: "100vw", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div>
      <Image src='https://wompampsupport.azureedge.net/fetchimage?siteId=7575&v=2&jpgQuality=100&width=700&url=https%3A%2F%2Fi.kym-cdn.com%2Fentries%2Ficons%2Fmobile%2F000%2F028%2F692%2Fcat.jpg' style={{width:"300px", height:"300px"}} roundedCircle></Image>
        <h3 style={{ textAlign: "center", paddingTop:"30px"}}>
          Sorry, we couldn't complete your transaction. 
        </h3>
        <h3 style={{ textAlign: "center", paddingTop: "30px"}}>
          Would you like to...
        </h3>
        <h3 style={{textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Link to={`../../organisation/${params.orgId}`}>
            <Button variant="warning" style={{ textDecoration: "none", color: "black", fontSize: "30px" }}>
              Try Again
            </Button>
          </Link>
          &nbsp;or&nbsp;
          <Link to="/">
            <Button variant="warning" style={{ textDecoration: "none", color: "black", fontSize: "30px" }}>
              Return to Donation page
            </Button>
          </Link>
        </h3>
      </div>
    </div>
  );
}

export default Cancel;