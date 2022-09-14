import { Link } from "react-router-dom";
import { Image, Button } from "react-bootstrap";
import "./Message.css";

function Success() {

    return (
        //   these lines set up the format of the page
        <div className="bg">
        {/* <div> */}
            <Image className="banner" src= "https://www.rd.com/wp-content/uploads/2021/01/GettyImages-1175550351.jpg"></Image>
            <div className="msgContainer" style={{height: "60vh", transform:"translate(0px,-15vh)"}}>
                <div>
                    <Image className="msgIcon" src='https://c.tenor.com/04BE-ClaaBAAAAAC/cat-money.gif' roundedCircle></Image>
                    <h1 className="msgTitle" style={{paddingTop:"50px"}}>
                        Thank You For Donating!
                    </h1>
                    <h2 className="msgText">
                        An email with your receipt will be sent to you.
                    </h2>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Link to='/'>
                            <Button className="msgButton" variant="warning">
                                <i>Why not donate again?</i>
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Success;
