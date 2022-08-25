import { Link } from "react-router-dom";
import FirebaseExample from "./FirebaseExample";

function Landing() {
    return (
        //   these lines set up the format of the page
        <div>
            <h1>
                Landing Page
            </h1>
            {/* <FirebaseExample/> */}
            <div>
                <Link to="general">General Donation</Link>
            </div>
        </div>
    );
}

export default Landing;