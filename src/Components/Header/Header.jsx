import React from 'react';
import { Button, Carousel, Container } from 'react-bootstrap';
import './cars.css';
import chair from  '../../assets/imgs/chair.jpg';
import vid from '../../assets/imgs/2.jpg';

const HeaderCarousel = (props) => {
  return (
    <Carousel>
      <Carousel.Item id='ee'>
        <img
          className="d-block w-100 carousel-img"
          src={props.img1}
          alt="First slide"
        />
   
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 carousel-img"
          src={props.img2}
          alt="Second slide"
        />
       
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 carousel-img"
          src={props.img3}
          alt="Third slide"
        />
       
      </Carousel.Item>
    </Carousel>
  );
};

export default HeaderCarousel;
