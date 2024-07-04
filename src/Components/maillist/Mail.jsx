import React, { useState } from "react";
import { Button, Container, Form, InputGroup, Row, Col } from "react-bootstrap";
import './mail.css';

const Mail = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://gaming-cd78d-default-rtdb.firebaseio.com/maillist.json", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: email })
      });

      if (response.ok) {
        setMessage("Successfully subscribed!");
        setEmail(""); // Clear the input field
      } else {
        setMessage("Subscription failed. Please try again.");
      }
    } catch (error) {
      setMessage("Subscription failed. Please try again.");
    }
  };

  return (
    <div className="Mailsec">
      <Container>
        <Row className="text-center mb-3">
          <Col>
            <h3>Join Our Mailing List</h3>
          </Col>
        </Row>
        <Row className="text-center mb-3">
          <Col>
            <h6>No Spam, unsubscribe anytime!</h6>
          </Col>
        </Row>
        <Row className="justify-content-center p-3">
          <Col xs={12} md={8} lg={6} className="d-flex justify-content-center">
            <div className="rounded-lg bg-light p-4 w-100 con">
              <Form onSubmit={handleSubmit}>
                <InputGroup>
                  <Form.Control
                    type="email"
                    placeholder="Your Mail"
                    aria-label="Recipient's email"
                    aria-describedby="basic-addon2"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Button type="submit" variant="primary" className="rounded-end">
                    Join
                  </Button>
                </InputGroup>
              </Form>
              {message && <p className="mt-3 text-center">{message}</p>}
            </div>
          </Col>
        </Row>
        <Row className="text-center mt-3">
          <Col>
            <h5>You're signing up to receive our emails and can unsubscribe at any time.</h5>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Mail;
