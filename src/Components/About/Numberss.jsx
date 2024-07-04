// About.js
import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./About.css";

const Numberss = () => {
  const [componentCount, setComponentCount] = useState(0);
  const [accessoryCount, setAccessoryCount] = useState(0);
  const [serviceCount, setServiceCount] = useState(0);

  useEffect(() => {
    const componentInterval = setInterval(() => {
      setComponentCount((prevCount) => {
        const nextCount = prevCount + 2;
        return nextCount >= 950 ? 950 : nextCount;
      });
    }, 50); // Adjust the interval duration as needed

    const accessoryInterval = setInterval(() => {
      setAccessoryCount((prevCount) => {
        const nextCount = prevCount + 3;
        return nextCount >= 850 ? 850 : nextCount;
      });
    }, 50); // Adjust the interval duration as needed

    const serviceInterval = setInterval(() => {
      setServiceCount((prevCount) => {
        const nextCount = prevCount + 4;
        return nextCount >= 1350 ? 1350 : nextCount;
      });
    }, 50); // Adjust the interval duration as needed

    return () => {
      clearInterval(componentInterval);
      clearInterval(accessoryInterval);
      clearInterval(serviceInterval);
    };
  }, []);

  return (
    <div className="container-xxl py-5">
      <Container>
        <Row className="g-5 align-items-center">
          <Col lg={6}>
            <h6 className="section-title text-start text-primary text-uppercase">
              About Service
            </h6>
            <h1 className="mb-4">
              At <span className="text-primary text-uppercase">Hook</span>
            </h1>
            <p className="mb-4">
              At Hook, we pride ourselves on providing top-notch services to
              meet the diverse needs of our customers.
              <br />
              Over the years, we've had the privilege of serving thousands of
              satisfied customers who have entrusted us with their PC needs.
              <br />
              your premier destination for top-notch electronic and PC services.
              With years of experience and thousands of satisfied customers, we
              pride ourselves on delivering exceptional service tailored to your
              needs. From PC components to gaming accessories, we've got you
              covered. Experience the Hook difference today!
            </p>
          </Col>
          <Col lg={6} className="momo">
            <Col sm={4}>
              <div className="border rounded p-1">
                <div className="border rounded text-center p-4">
                  <i className="fa fa-hotel fa-2x text-primary mb-2"></i>
                  <h2 className="mb-1">{componentCount.toLocaleString()}</h2>
                  <p className="mb-0">PC Components</p>
                </div>
              </div>
            </Col>
            <Col sm={4}>
              <div className="border rounded p-1">
                <div className="border rounded text-center p-4">
                  <i className="fa fa-hotel fa-2x text-primary mb-2"></i>
                  <h2 className="mb-1">{accessoryCount.toLocaleString()}</h2>
                  <p className="mb-0">Gaming Accessories</p>
                </div>
              </div>
            </Col>
            <Col sm={4}>
              <div className="border rounded p-1">
                <div className="border rounded text-center p-4">
                  <i className="fa fa-hotel fa-2x text-primary mb-2"></i>
                  <h2 className="mb-1">{serviceCount.toLocaleString()}</h2>
                  <p className="mb-0">Technical Components and Services</p>
                </div>
              </div>
            </Col>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Numberss;
