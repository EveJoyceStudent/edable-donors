import { ReactComponent as EdAbleStar } from "./DonorForm/EdAbleStar.svg";

function Default() {
  return (
    //   these lines set up the format of the page
    <div style={{ textAlign: "center" }}>
      <EdAbleStar className="EdAbleStar" />
      <h4 style={{ color: "#FF7000" }}>Oops! Something went wrong.</h4>
      <a href="/">Take me back to EdAble.</a>
    </div>
  );
}

export default Default;
