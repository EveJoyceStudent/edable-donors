import { useEffect, useState } from "react";
import "./Landing.css";
import { Link } from "react-router-dom";
import { db } from "../../config/firebase";
import { collection, query, onSnapshot, where } from "firebase/firestore";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import { ReactComponent as LandingPageStar } from "./star.svg";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Sidebar from "./Sidebar";
import ItemsCollection from "./ItemsCollection";

function Landing() {
  const [orgList, setOrgList] = useState<any>([]);

  // gets all the orgs from dbs
  useEffect(() => {
    const q = query(
      collection(db, "Organisations"),
      where("activeStatus", "==", true)
    );
    onSnapshot(q, (querySnapshot) => {
      // setOrgList dumps all the orgs in orgList
      setOrgList(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  return (
    //   these lines set up the format of the page
    <>
      <div className="landing">
        {/* Burger menu */}
        <div className="navBarContainer">
          <Sidebar />
        </div>

        <div className="header">
          <Container fluid>
            <Row>
              <Col xs={0} md="auto">
                <LandingPageStar
                  style={{
                    height: 190,
                    width: 400,
                    display: "block",
                    margin: "auto",
                  }}
                />
              </Col>
              <Col>
                <h1>EdAble</h1>
                <h3>
                  <i>
                    increasing employment opportunities for people with Autism
                    Spectrum Disorder and other Disabilities
                  </i>
                </h3>
              </Col>
            </Row>
          </Container>
          <br />
          <p>
            By making a tax deductable donation to EdAble, you will contribute
            to...
          </p>
          <div className="App" id="outer-container">
            {/* Carousel */}
            <Container>
              <Row>
                <Col>
                  <div className="carouselContainer">
                    <Carousel
                      touch={true}
                      interval={null}
                      indicators={true}
                      variant="dark"
                      style={{ margin: "3px" }}
                    >
                      {orgList.map((org: any) => (
                        <Carousel.Item
                          key={org.id.toString()}
                          style={{
                            textAlign: "center",
                            padding: "0px 10vw 50px",
                          }}
                        >
                          <h2 style={{ textAlign: "center" }}>
                            {org.data.name}
                          </h2>
                          <img
                            style={{
                              height: "200px",
                              width: "200px",
                              paddingBottom: "20px",
                            }}
                            src={org.data.img}
                            alt="Org logo"
                          />
                          <p style={{ textAlign: "center", fontSize: "20px" }}>
                            {org.data.summary}
                          </p>
                          <Button variant="warning">
                            <Link
                              style={{
                                textDecoration: "none",
                                color: "black",
                                fontSize: "20px",
                              }}
                              to={`organisation/${org.id}`}
                            >
                              <i>
                                COUNT ME IN AS A PARTNER!<br></br>I WANT TO MAKE
                                A CONTRIBUTION!
                              </i>
                            </Link>
                          </Button>
                        </Carousel.Item>
                      ))}
                    </Carousel>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
        <ItemsCollection />
      </div>
    </>
  );
}

export default Landing;
