import React from "react";
import "./About.css";
import HeaderCarousel from "../Header/Header";
import { Col, Container, Row } from "react-bootstrap";
import photo1 from "../../assets/imgs/228.jpg";
import photo2 from "../../assets/imgs/229.jpg";
import Numberss from "./Numberss";
const About = () => {
  return (
    <div className="about">
      <div className="aboutheader">
        <HeaderCarousel
          img1="https://i.filecdn.in/396malukaiiass/aboutus-1630219904059.png"
          img2="https://media.licdn.com/dms/image/D5612AQHAd0-B1gcpNw/article-cover_image-shrink_720_1280/0/1679951041459?e=2147483647&v=beta&t=DeWT7kN5bCRg9TatwXhJYEGFgiVKlmN0kKH5hnsDSWU"
          img3="https://www.elnekhelytechnology.com/image/catalog/1231231111.PNG"
        />
      </div>
      <Row>
        <Col>
          <div className="anim">
            <h1>Who are we ..?</h1>

            <img
              src="https://i.pinimg.com/originals/50/78/a0/5078a05eb1b6847d93383eaa4c0ed500.gif"
              width={"350px"}
            ></img>
          </div>
        </Col>
      </Row>

      <div className="firstsectionabout">
        <Container>
          <Row>
          
            <Col>
              <div className="headline-container">
                <h1 className="headline">About us</h1>
                <p>
                  Welcome to Hook, where two passionate individuals set out to
                  revolutionize the PC component industry. Our mission is to
                  provide high-quality, unique PC parts that stand out in the
                  competitive market, especially within the gaming industry.
                </p>
                <p>
                  At Hook, we believe that being different is the key to
                  success. Our creators are dedicated to developing products
                  that offer a distinct edge, ensuring that our customers
                  receive the best possible e-sports solutions. Our world is
                  overflowing with technology, but we understand that
                  exceptional service is the cornerstone of lasting success.
                </p>
              </div>
            </Col>
            <Col>
              <img src={photo1} id="imageabout"></img>
            </Col>  
          </Row>
        </Container>
      </div>
      <Numberss/>
      
     <div className="secondsection">
        <Container>
            <Row>
            
            <Col>
                    <img src={photo2} alt="image" id="secondimage"></img>
                </Col>
                <Col className="secondcontent ">
                <h1 className="headline">Our Goal ...</h1>
                <p>
                We strive to answer the crucial question: "Is service the key to success?" At Hook, we aim to build a trusted relationship with our customers by consistently delivering innovative products and unparalleled support. Join us in our journey to redefine the gaming experience with Hook's unique and reliable PC components.
                </p>
              <p>
              We understand the importance of staying ahead in today's fast-paced technological landscape. That's why we constantly strive to offer the latest and most innovative products to our customers. Our dedicated team ensures that you receive nothing but the best, backed by our expertise and commitment to excellence.


              </p>
                </Col>
               
            </Row>
        </Container>
     </div>
    </div>
  );
};

export default About;
