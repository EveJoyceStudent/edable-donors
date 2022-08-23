import { Link } from "react-router-dom";

function Landing() {
    return (
        //   these lines set up the format of the page
        <div>
            <h1>
                Landing Page
            </h1>
            <div>
                <Link to="general">General Donation</Link>
            </div>
        </div>
    );
}

export default Landing;