import { Link } from "react-router-dom";
import { Image, Button } from "react-bootstrap";

function Success() {
    return (
        //   these lines set up the format of the page
        <div>
            <Image src= "https://www.rd.com/wp-content/uploads/2021/01/GettyImages-1175550351.jpg" style={{height:"40vh",width:"100vw", objectFit:"cover"}}></Image>
            <div style={{ height: "60vh", width: "100vw", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div>
                    <h1 style={{ textAlign: "center", fontSize: "80px" }}>
                        Thank You For Donating!
                    </h1>
                    <h2 style={{ textAlign: "center", fontSize: "35px", padding: "40px" }}>
                        An email with your receipt will be sent to you.
                    </h2>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Link to={'/'}>
                            <Button variant="warning" style={{ textDecoration: "none", color: "black", fontSize: "30px" }}>
                                <i>~click here to donate again~</i>
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Success;