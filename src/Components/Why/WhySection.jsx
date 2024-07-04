import React from "react";
import "./why.css";
import { Button, Col, Container, Row } from "react-bootstrap";
import icon1 from "../../assets/imgs/sol.png";
import icon2 from "../../assets/imgs/customer.png";
import icon3 from "../../assets/imgs/exp.png";
import icon4 from "../../assets/imgs/save-money.gif";

const WhySection = () => {
  return (
    <div className="whysection">
      <Container id="elc">
        <Row className="align-items-stretch">
          <Col
            xs={12}
            md={2}
            className="d-flex flex-column justify-content-center colmarg"
          >
            <h4 id="whyt">Why buy direct from Hook?</h4>
            <Button
              id="whyb"
              variant="info"
              style={{ width: "7rem" }}
              href="./about"
            >
              Click here
            </Button>
          </Col>
          <Col xs={12} md={10}>
            <Row>
              <Col xs={12} md={6} className="iconwhy colmarg">
                <img src={icon3} alt="icon1" />
                <p>
                   Proven Track Record With years of
                  experience in the industry and thousands of satisfied
                  customers
                </p>
              </Col>
              <Col xs={12} md={6} className="iconwhy colmarg">
                <img src={icon2} alt="icon2" />
                <p>
                  Exceptional Customer Service 
                   Our dedicated team goes above and beyond to ensure you receive
                  personalized and attentive support
                </p>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={6} className="iconwhy colmarg">
                <img src={icon1} alt="icon3" />
                <p>Tailored Solutions , We understand that every customer has unique requirements. That's why we take the time to tailor our services to meet your specific needs.</p>
              </Col>
              <Col xs={12} md={6} className="iconwhy colmarg">
              <img width="96" height="96" src="https://img.icons8.com/fluency/96/000000/money-bag--v1.png" alt="money-bag--v1"/>

<p>
   Competitive Pricing 
   we believe in providing exceptional value for your money. Our competitive pr
   icing ensures that you get the best deals on high-quality products and services. </p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default WhySection;
