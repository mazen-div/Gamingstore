import React, { useEffect, useState } from 'react';
import { Carousel, Col, Container, Row } from "react-bootstrap";
import './Feedback.css'
const FeedCompo = () => {
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
        <div id='fdc'>
            <br/>
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
                  fontFamily:'Knewave',
                }}
              >
               Our client's Feedback
              </h2>
            </Col>
          </Row>
          <br/>
         
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
        </div>
    );
}

export default FeedCompo;
