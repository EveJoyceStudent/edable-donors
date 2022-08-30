import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../config/firebase";
import { collection, query, onSnapshot } from "firebase/firestore";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";

function Landing() {
  const [orgList, setOrgList] = useState<any>([]);

  // gets all the orgs from dbs
  useEffect(() => {
    const q = query(collection(db, "Organisations"));
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
      <div
        style={{
          background:
            "linear-gradient(90deg, rgba(178,191,221,1) 41%, rgba(191,224,227,1) 79%, rgba(148,187,233,1) 100%)",
        }}
      >
        <div
          style={{
            height: "100%",
            width: "100%",
          }}
        >
          <h1
            style={{
              textAlign: "right",
              marginRight: "20px",
              fontSize: "85px",
            }}
          >
            <b>EdAble</b>
          </h1>
          <h3
            style={{
              textTransform: "uppercase",
              textAlign: "right",
              marginRight: "20px",
            }}
          >
            <i>Supporting the growth of social-enterprises</i>
          </h3>
          <h4>
            By making a tax deductable doantion to EdAble, you will contribute
            to...
          </h4>
          <Carousel
            touch={true}
            interval={null}
            indicators={false}
            style={{
              background:
                "linear-gradient(90deg, rgba(173,173,173,1) 0%, rgba(242,236,236,1) 50%, rgba(126,126,126,1) 100%)",
              width: "100%",
              marginTop: "30px",
              paddingTop: "20px",
              paddingBottom: "20px",
            }}
          >
            {orgList.map((org: any) => (
              <Carousel.Item
                key={org.id.toString()}
                style={{ textAlign: "center" }}
              >
                <img
                  style={{ height: "550px", width: "700px" }}
                  src={org.data.img}
                  alt="Org logo"
                />

                <h3>{org.data.description}</h3>
                <Button variant="dark" style={{ fontSize: "25px" }}>
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to={`organisation/${org.id}`}
                  >
                    pls help uwu
                  </Link>
                </Button>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </div>
      {/* items */}
      <h1>ITEMS GO HERE BRRRRRRRR 🔫 </h1>
    </>
  );
}

export default Landing;
