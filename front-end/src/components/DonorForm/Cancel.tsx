import { Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

function Cancel() {
  let params = useParams();
  return (
    //   these lines set up the format of the page
    <>
      <h3>
        We couldn't complete your transaction. Would you like to
        <div>
          <Link to={`../../organisation/${params.orgId}`}>
            <Button>
              Try Again
            </Button>
          </Link>
          or
          <Link to="/">
            <Button>
              return to Donation page
            </Button>
          </Link>
        </div>
      </h3>
    </>
  );
}

export default Cancel;