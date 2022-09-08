import { Link } from "react-router-dom";

function Success() {
  return (
    //   these lines set up the format of the page
    <div>
      <h1>Thank you for your donation.</h1>
      <div>
        <Link to="/">Home</Link>
      </div>
    </div>
  );
}

export default Success;
