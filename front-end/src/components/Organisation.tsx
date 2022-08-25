import { Link, useParams } from "react-router-dom";

function Organisation() {
    let params = useParams();
    return (
        //   these lines set up the format of the page
        <div>
            <h1>
                {params.orgId} Donation Page
            </h1>
            <div>
                <Link to="/">Home</Link>
            </div>
        </div>
    );
}

export default Organisation;