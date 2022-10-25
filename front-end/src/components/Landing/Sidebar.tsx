import { useState, useEffect } from "react";
import { query, onSnapshot, collection, where } from "firebase/firestore";
import { db } from "../../config/firebase";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";

type SidemenuProps = {
  pageWrapId: string;
  outerContainerId: string;
};

function Sidebar(props: any) {
  const [search, setSearch] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filteredOrganisations = props.orgList.filter((Organisations: any) =>
    Organisations.data.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <>
      <Navbar expand={false}>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand`}
          aria-labelledby={`offcanvasNavbarLabel-expand`}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title
              id={`offcanvasNavbarLabel-expand`}
              style={{
                fontSize: "20px",
              }}
            >
              Micro-businesses supported by EdAble
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
                key={Organisation.id}
              >
                <br />
                <div>{Organisation.data.name}</div>
              </Link>
            ))}
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Navbar>
    </>
  );
}

export default Sidebar;
