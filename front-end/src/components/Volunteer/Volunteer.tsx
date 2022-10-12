import { useEffect, useState } from "react";
import "../Landing/Landing.css";
import { Link } from "react-router-dom";
import { db } from "../../config/firebase";
import { collection, query, onSnapshot, where } from "firebase/firestore";
import { Button, Container, Carousel, Row, Col } from "react-bootstrap";
import { ReactComponent as LandingPageStar } from "../Landing/star.svg";

import Sidebar from "../Landing/Sidebar";
import ItemsCollection from "../Landing/ItemsCollection";
import Organisation from "../Organisation/Organisation";
import TasksCollection from "./TasksCollection";

function Volunteer() {
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

  useEffect(() => {
    window.scrollTo(0, 0);
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
                <LandingPageStar className="star" />
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
            Volunteer now.
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
                    >
                      {orgList.map((org: any) => (
                        <Carousel.Item
                          key={org.id.toString()}
                          style={{
                            textAlign: "center",
                          }}
                        >
                          <Link to={`/volunteer/organisation/${org.id}`}
                            style={{
                              textDecoration: "none",
                              color: "black",
                            }}
                          >
                            {/* this div contains the carousel item's contents and makes the whole carousel item a link (based on link tag above) */}
                            <div className="carousel-contents">
                              <h2 style={{ textAlign: "center" }}>
                                {org.data.name}
                              </h2>
                              <img className="imgCarousel"
                                src={org.data.img}
                                alt={`${org.data.name}` + "'s logo"}
                              />
                              <p className="orgSummary">
                                {org.data.summary}
                              </p>
                              <Button
                                className="btnContribute"
                                variant="warning"
                              >
                                <i className="btnText">
                                  COUNT ME IN AS A PARTNER!<br></br>I WANT TO MAKE
                                  A CONTRIBUTION!
                                </i>
                              </Button>
                            </div>
                          </Link>

                        </Carousel.Item>
                      ))}
                    </Carousel>
                  </div>
                </Col>
              </Row>
              <Row>
                <TasksCollection/>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    </>
  );
}

export default Volunteer;