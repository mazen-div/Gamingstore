import React, { useState, useEffect } from 'react';
import { Carousel, Col, Row } from "react-bootstrap";
import './Feedback.css';
import ContactForm from '../Contact/ContactForm';

const Feedback = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch('https://gaming-cd78d-default-rtdb.firebaseio.com/reviews.json')
      .then(response => response.json())
      .then(data => {
        const formattedReviews = Object.values(data).map(review => ({
          firstname: review.firstname,
          lastname: review.lastname,
          imageLink: review.imageLink,
          message: review.message
        }));
        setReviews(formattedReviews);
      })
      .catch(error => console.error('Error fetching reviews:', error));
  }, []);

  return (
    <>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-img"
            src="https://visme.co/blog/wp-content/uploads/2022/02/How-to-Create-an-Effective-Testimonial-Video-Header.jpg"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-img"
            src="https://www.brafton.com/wp-content/uploads/2024/04/Testimonial-Design-1-scaled.jpeg"
          />
        </Carousel.Item>
      </Carousel>

      <Row className="py-5 text-center" id='fed'>
        <Col md="12">
          <Carousel controls={true} indicators={false}>
            {reviews.map((review, index) => (
              <Carousel.Item key={index}>
                <p className="lead font-italic mx-4 mx-md-5">{review.message}</p>
                <div className="mt-5 mb-4">
                  <img
                    src={review.imageLink}
                    className="rounded-circle img-fluid shadow-1-strong"
                    alt="Reviewer"
                    width="100"
                    height="100"
                  />
                </div>
                <h6 className="text-muted mb-0" id='dads'>- {review.firstname} {review.lastname}</h6>
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
      </Row>

      <br />

      <Row id='feddiv'>
        <Col>
          <h2
            className="fancy"
            id="divif"
            style={{
              "--w": "50vw",
              "--c": "#003c43",
              "--b": "4px",
              "--g": "-5px"
            }}
          >
            Send Your Feedback Now
          </h2>
        </Col>
      </Row>

      <Row>
        <Col id='elfed' >
          <center>
       <ContactForm />
       </center>
          <br />
        </Col>
      </Row>
    </>
  );
}

export default Feedback;
