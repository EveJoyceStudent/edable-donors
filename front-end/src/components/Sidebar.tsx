import "./Sidebar.css";
import { useState, useEffect } from "react";
import { collectionGroup, query, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";

type SidemenuProps = {
  pageWrapId: string;
  outerContainerId: string;
};

function Sidebar({ pageWrapId, outerContainerId }: SidemenuProps) {
  const [orgList, setOrganisationsList] = useState<any>([]);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const Organisations = query(collectionGroup(db, "Organisations"));
    onSnapshot(Organisations, async (querySnapshot) => {
      setOrganisationsList(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);
  // console.log(orgList)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filteredOrganisations = orgList.filter((Organisations: any) =>
    Organisations.data.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <>
      <Navbar bg="light" expand={false} className="mb-3">
        <Container fluid>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand`}
            aria-labelledby={`offcanvasNavbarLabel-expand`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand`}>
                Organisations
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <input type="text" onChange={handleChange} placeholder="Search" />
              {filteredOrganisations.map((Organisation: any) => (
                <Link
                  style={{
                    textDecoration: "none",
                    color: "black",
                  }}
                  to={`organisation/${Organisation.id}`}
                >
                  <div>{Organisation.data.name}</div>
                </Link>
              ))}
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

export default Sidebar;
