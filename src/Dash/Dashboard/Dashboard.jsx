import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Sidebar from '../Sidebar/Sidebar';
import { Link } from 'react-router-dom';
import Auth from './Auth';
import './Dashboard.css';

const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds

const Dashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    const currentTime = new Date().getTime();
    sessionStorage.setItem('loginTime', currentTime);
    setIsAuthenticated(true);
  };

  useEffect(() => {
    const checkAuth = () => {
      const loginTime = sessionStorage.getItem('loginTime');
      if (loginTime) {
        const currentTime = new Date().getTime();
        if (currentTime - loginTime < oneHour) {
          setIsAuthenticated(true);
        } else {
          sessionStorage.removeItem('loginTime');
          setIsAuthenticated(false);
        }
      }
    };
    checkAuth();
    const interval = setInterval(checkAuth, oneHour); // Check every hour
    return () => clearInterval(interval);
  }, []);

  if (!isAuthenticated) {
    return <Auth onLogin={handleLogin} />;
  }

  return (
    <div className="dashboard">
     <center style={{margin:'10px'}}>
        <Sidebar />
      </center>
      <Container>
        <Row>
          <Col id='feddiv'>
            <h2
              className="fancy"
              id="dividerfont"
              style={{
                "--w": "50vw",
                "--c": "#003c43",
                "--b": "4px",
                "--g": "-5px",
                fontFamily: 'Knewave',
              }}
            >
              Dashboard
            </h2>
          </Col>
        </Row>
      </Container>
      <Container className="dashboard-content">
        <Row>
          <Col xs={12} md={4} className="mb-3">
            <div className="group-wrapper">
              <Card as={Link} to={'/addproduct'} className="dashboard-card">
                <Card.Body>
                  <Card.Title>Add Product</Card.Title>
                </Card.Body>
              </Card>
              <Card as={Link} to={'/theproducts'} className="dashboard-card">
                <Card.Body>
                  <Card.Title>Products</Card.Title>
                </Card.Body>
              </Card>
            </div>
          </Col>
          <Col xs={12} md={4} className="mb-3">
            <div className="group-wrapper">
              <Card as={Link} to={'/addreview'} className="dashboard-card">
                <Card.Body>
                  <Card.Title>Add Review</Card.Title>
                </Card.Body>
              </Card>
              <Card as={Link} to={'/thereviews'} className="dashboard-card">
                <Card.Body>
                  <Card.Title>Reviews</Card.Title>
                </Card.Body>
              </Card>
            </div>
          </Col>
          <Col xs={12} md={4} className="mb-3">
            <div className="group-wrapper">
              <Card as={Link} to={'/addcategory'} className="dashboard-card">
                <Card.Body>
                  <Card.Title>Add Category</Card.Title>
                </Card.Body>
              </Card>
              <Card as={Link} to={'/thecategories'} className="dashboard-card">
                <Card.Body>
                  <Card.Title>Categories</Card.Title>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={4} className="mb-3">
            <div className="group-wrapper">
              <Card as={Link} to={'/thecommonProducts'} className="dashboard-card">
                <Card.Body>
                  <Card.Title>Products Slider</Card.Title>
                </Card.Body>
              </Card>
              <Card as={Link} to={'/addCommonProducts'} className="dashboard-card">
                <Card.Body>
                  <Card.Title>Add Products To Slider</Card.Title>
                </Card.Body>
              </Card>
            </div>
          </Col>
          <Col xs={12} md={4} className="mb-3">
            <div className="group-wrapper">
            
              <Card as={Link} to={'/contactmanage'} className="dashboard-card">
                <Card.Body>
                  <Card.Title>Social Media data and contact us data</Card.Title>
                </Card.Body>
              </Card>
            </div>
          </Col>
          <Col xs={12} md={4} className="mb-3">
            <div className="group-wrapper">
              <Card as={Link} to={'/RealFeedback'} className="dashboard-card">
                <Card.Body>
                  <Card.Title>Real Feedback from clients "Form Site" </Card.Title>
                </Card.Body>
              </Card>
              <Card as={Link} to={'/mailssub'} className="dashboard-card">
                <Card.Body>
                  <Card.Title>Mail List Subscribe</Card.Title>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
