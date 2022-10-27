import { useEffect, useState } from "react";
import "./Landing.css";
import { Link } from "react-router-dom";
import { db } from "../../config/firebase";
import { collection, query, onSnapshot, where } from "firebase/firestore";
import { Button, Container, Carousel, Row, Col } from "react-bootstrap";
import { ReactComponent as InclusionHero } from "./InclusionHero.svg";

import Sidebar from "./Sidebar";
import ItemsCollection from "./ItemsCollection";
import Organisation from "../Organisation/Organisation";

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    //   these lines set up the format of the page
    <>
      <div className="landing">
        {/* Burger menu */}
        <div className="navBarContainer">
          <Sidebar orgList={orgList} />
        </div>

        <div className="App" id="outer-container">
          {/* Carousel */}
          <Container>
            <Row>
              <Col>
                <div className="carouselContainer">
                  <Carousel
                    touch={true}
                    interval={3000}
                    indicators={true}
                    variant="light"
                  >
                    {orgList.map((org: any) => (
                      <Carousel.Item
                        key={org.id.toString()}
                        style={{
                          textAlign: "center",
                        }}
                      >
                        <Link
                          to={`organisation/${org.id}`}
                          style={{
                            textDecoration: "none",
                            color: "black",
                          }}
                        >
                          {/* this div contains the carousel item's contents and makes the whole carousel item a link (based on link tag above) */}
                          <div className="carousel-contents">
                            <img
                              className="imgCarousel"
                              src={org.data.img}
                              alt={`${org.data.name}` + "'s logo"}
                            />
                            <p className="orgSummary">{org.data.summary}</p>

                            <Button className="btnContribute" variant="warning">
                              <i className="btnText">
                                I want to btn contribute to<br></br>
                                <b>{org.data.name}!</b>
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
          </Container>
        </div>

        <ItemsCollection orgList={orgList} />
      </div>
    </>
  );
}

export default Landing;
