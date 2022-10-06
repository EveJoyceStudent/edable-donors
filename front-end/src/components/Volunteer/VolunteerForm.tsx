// @ts-ignore
import { useState } from "react";
import { Button, Tooltip, OverlayTrigger, Container, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import "../DonorForm/DonorForm.css";

type DonorFormType = {
  name: string;
  phone: string;
  email: string;
};

function VolunteerForm(props: any) {

  return(
    <div className="donorInfoContainer">
      <div>
        <p>I would like to volunteer!</p>
        <form>
          <div>
            <label>Name</label>
            <input type="text"
              placeholder="Name"
            />
          </div>
          <div>
            <label>Registering on behalf of an organisation?</label>
            <input type="checkbox" id="isOrg" value="yes" />
            <div className="volunteerOrgInfo">
              <div>
                <label>Organisation Name</label>
                <input type="text" placeholder="Name of Organisation" />
              </div>
              <div>
                <label>Number of Volunteers</label>
                <input type="number" placeholder="0" />
              </div>
            </div>
            <div className="DOB">
                <label>Date of Birth</label>
                <input type="date"></input>
              </div>
          </div>
          <div>
            <label>Phone</label>
            <input type="text"
              placeholder="04XXXXXXXX"
            />
          </div>
          <div>
            <label>Email</label>
            <input type="text"
              placeholder="Email"
            />
          </div>
          <div>
            <label>Postcode</label>
            <input type="number"
              placeholder="0000"
            />
          </div>
          <hr/>
          <div>
            <label>Hours Available</label>
            <input type="number" placeholder="0"></input>
          </div>
          <div>
            <label>Days Available</label>
            <div className="availablity">
              <Container style={{textAlign:"center"}}>
                <Row>
                  <Col>
                    <label>Monday</label>
                    <input type="checkbox" id="Monday"></input>
                  </Col>
                  <Col>
                    <label>Tuesday</label>
                    <input type="checkbox" id="Tuesday"></input>
                  </Col>
                  <Col>
                    <label>Wednesday</label>
                    <input type="checkbox" id="Wednesday"></input>
                  </Col>
                  <Col>
                    <label>Thursday</label>
                    <input type="checkbox" id="Thursday"></input>
                  </Col>
                  <Col>
                    <label>Friday</label>
                    <input type="checkbox" id="Friday"></input>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <label>Saturday</label>
                    <input type="checkbox" id="Saturday"></input>
                  </Col>
                  <Col>
                    <label>Sunday</label>
                    <input type="checkbox" id="Sunday"></input>
                  </Col>
                </Row>
              </Container>
            </div>
          </div>
          <div>
            <label>How would you like to contribute?</label>
            <input type="text"
              placeholder="What would you like to do?"
            />
          </div>
          <div>
            <label>Skills (optional)</label>
            <input type="text"
              placeholder="List your skills"
            />
          </div>
          <div style={{
            marginTop: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}>
            <Button variant="warning">Register your interest</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default VolunteerForm;
