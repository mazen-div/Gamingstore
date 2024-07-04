import React, { useEffect, useState } from 'react';
import { Carousel, Card, Container, Row, Col } from 'react-bootstrap';
import './Test.css';

const ProductSlider = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://gaming-cd78d-default-rtdb.firebaseio.com/common.json")
      .then((response) => response.json())
      .then((data) => {
        const productsArray = Object.values(data).map((product) => ({
          img: product.image.replace(/(^"|"$)/g, ''), // Remove extra quotes
          description: product.name.replace(/(^"|"$)/g, '') // Remove extra quotes
        }));
        setProducts(productsArray);
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  const chunkedProducts = [];
  const isMobile = window.innerWidth < 768; // Check if it's a mobile device
  const chunkSize = isMobile ? 1 : 3; // Set chunk size based on device type

  for (let i = 0; i < products.length; i += chunkSize) {
    chunkedProducts.push(products.slice(i, i + chunkSize));
  }

  return (
    <Container className="my-5">
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col xs={12} md={12}>
            <div className="custom-card">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
                <path strokeWidth="8" strokeLinejoin="round" strokeLinecap="round" fill="none" d="M65.8,46.1V30.3a15.8,15.8,0,1,0-31.6,0V46.1M22.4,38.2H77.6l4,47.3H18.4Z" />
              </svg>
              <div className="discount-info">
                <h2 className="text-center mb-4 producttitle">Common Products</h2>
                <p className="main-text">Discount</p>
                <p className="sub-text">Up to</p>
              </div>
              <span className="discount">20%</span>
            </div>
          </Col>
        </Row>
      </Container>
      <Carousel>
        {chunkedProducts.map((productGroup, index) => (
          <Carousel.Item key={index}>
            <Row className="justify-content-center">
              {productGroup.map((product, idx) => (
                <Col key={idx} xs={12} sm={6} md={4}>
                  <Card className="text-center">
                    <Card.Img variant="top" src={product.img} alt={`Product ${index * chunkSize + idx + 1}`} />
                    <Card.Body>
                      <Card.Text>{product.description}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
}

export default ProductSlider;
