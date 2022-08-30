import { Link } from "react-router-dom";

function General() {
    return (
        //   these lines set up the format of the page
        <div>
            <h1>
                General Page
            </h1>
            <div>
                <Link to="/">Home</Link>
            </div>
        </div>
    );
}

export default General;