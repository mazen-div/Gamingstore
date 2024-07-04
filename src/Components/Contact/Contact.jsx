import React, { useState, useEffect } from "react";
import "./Contact.css";
import HeaderCarousel from "../Header/Header";
import { Carousel, Col, Container, Row } from "react-bootstrap";
import locationimg from "../../assets/imgs/location.png";
import callimg from "../../assets/imgs/phone-call.png";
import ContactForm from "./ContactForm";

const Contact = () => {
  const [contactData, setContactData] = useState(null);

  useEffect(() => {
    fetch("https://gaming-cd78d-default-rtdb.firebaseio.com/contact.json")
      .then((response) => response.json())
      .then((data) => setContactData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-img"
            src="https://reelbigmedia.com/wp-content/uploads/contact-us-banner.jpg"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item id="ee">
          <img
            className="d-block w-100 carousel-img"
            src="https://www.rribsb.my/wp-content/uploads/2020/08/mh-contact-us-1.gif"
            alt="First slide"
          />
        </Carousel.Item>
      </Carousel>
      <div className="firstsec">
        <Container>
          <Row>
            <Col md={6}>
              <iframe
                className="maploc"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54968.23262702807!2d30.967464947536456!3d30.563017072819335!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f7d68b68933ea3%3A0x77434af2db2fa06f!2sShebeen%20El-Kom%2C%20Qism%20Shebeen%20El-Kom%2C%20Shibin%20el%20Kom%2C%20Menofia%20Governorate!5e0!3m2!1sen!2seg!4v1716683228610!5m2!1sen!2seg"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </Col>
            <Col md={6}>
             <ContactForm/>
            </Col>
          </Row>
          <Row>
            <Col>
              <h2
                className="fancy"
                id="dividerfont"
                style={{
                  "--w": "50vw",
                  "--c": "#003c43",
                  "--b": "4px",
                  "--g": "-5px",
                }}
              >
                How To Reach US
              </h2>
            </Col>
          </Row>
          <Row className="secondrow">
            <Col>
              <div className="unique-card">
                <div className="background-overlay"></div>
                <div className="card-content carwid">
                  <div className="card-title">
                    <img src={locationimg} /> {contactData && contactData.location}
                  </div>
                  <div className="card-description">
Visit us on our Location                  </div>
                </div>
              </div>
            </Col>

            <Col>
              <div className="unique-card">
                <div className="background-overlay"></div>
                <div className="card-content">
                  <div className="social-main">
                    <div className="social-up">
                        <a href={contactData && contactData.instagram} target="_blank">
                      <button className="social-card1">
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0,0,256,256"
                          width="30px"
                          height="30px"
                          fillRule="nonzero"
                          className="social-instagram"
                        >
                          <g
                            fillRule="nonzero"
                            stroke="none"
                            strokeWidth="1"
                            strokeLinecap="butt"
                            strokeLinejoin="miter"
                            strokeMiterlimit="10"
                            fontFamily="none"
                            fontWeight="none"
                            fontSize="none"
                            textAnchor="none"
                            style={{ mixBlendMode: "normal" }}
                          >
                            <g transform="scale(8,8)">
                              <path d="M11.46875,5c-3.55078,0 -6.46875,2.91406 -6.46875,6.46875v9.0625c0,3.55078 2.91406,6.46875 6.46875,6.46875h9.0625c3.55078,0 6.46875,-2.91406 6.46875,-6.46875v-9.0625c0,-3.55078 -2.91406,-6.46875 -6.46875,-6.46875zM11.46875,7h9.0625c2.47266,0 4.46875,1.99609 4.46875,4.46875v9.0625c0,2.47266 -1.99609,4.46875 -4.46875,4.46875h-9.0625c-2.47266,0 -4.46875,-1.99609 -4.46875,-4.46875v-9.0625c0,-2.47266 1.99609,-4.46875 4.46875,-4.46875zM21.90625,9.1875c-0.50391,0 -0.90625,0.40234 -0.90625,0.90625c0,0.50391 0.40234,0.90625 0.90625,0.90625c0.50391,0 0.90625,-0.40234 0.90625,-0.90625c0,-0.50391 -0.40234,-0.90625 -0.90625,-0.90625zM16,10c-3.30078,0 -6,2.69922 -6,6c0,3.30078 2.69922,6 6,6c3.30078,0 6,-2.69922 6,-6c0,-3.30078 -2.69922,-6 -6,-6zM16,12c2.22266,0 4,1.77734 4,4c0,2.22266 -1.77734,4 -4,4c-2.22266,0 -4,-1.77734 -4,-4c0,-2.22266 1.77734,-4 4,-4z"></path>
                            </g>
                          </g>
                        </svg>  </button>
                      </a>
                      <a href={`https://api.whatsapp.com/send?phone=2${contactData && contactData.whatsapp}`} target="_blank">
                      <button className="social-card2">
                        <svg
                          width="30px"
                          height="30px"
                          viewBox="0 0 30 30"
                          role="img"
                          className="social-twitter"
                          xmlns="http://www.w3.org/2000/svg"
                        >
             <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />                        </svg>
                      </button>
                      </a>
                    </div>
                    <div className="social-down">
                    <a href={contactData && contactData.facebook} target="_blank">
                      <button className="social-card3">
                        <svg
                          width="30px"
                          height="30px"
                          viewBox="0 0 30 30"
                          xmlns="http://www.w3.org/2000/svg"
                          className="social-github"
                        >
                        <path d="M20.9,2H3.1A1.1,1.1,0,0,0,2,3.1V20.9A1.1,1.1,0,0,0,3.1,22h9.58V14.25h-2.6v-3h2.6V9a3.64,3.64,0,0,1,3.88-4,20.26,20.26,0,0,1,2.33.12v2.7H17.3c-1.26,0-1.5.6-1.5,1.47v1.93h3l-.39,3H15.8V22h5.1A1.1,1.1,0,0,0,22,20.9V3.1A1.1,1.1,0,0,0,20.9,2Z" />
                        </svg>
                      </button>
                      </a>
                      <a href={contactData && contactData.tiktok} target="_blank">
                      <button className="social-card4">
                        <svg
                          height="40px"
                          width="40px"
                          viewBox="0 0 50 30"
                          xmlns="http://www.w3.org/2000/svg"
                          className="social-discord"
                        >
                        <path d="M16.656 1.029c1.637-0.025 3.262-0.012 4.886-0.025 0.054 2.031 0.878 3.859 2.189 5.213l-0.002-0.002c1.411 1.271 3.247 2.095 5.271 2.235l0.028 0.002v5.036c-1.912-0.048-3.71-0.489-5.331-1.247l0.082 0.034c-0.784-0.377-1.447-0.764-2.077-1.196l0.052 0.034c-0.012 3.649 0.012 7.298-0.025 10.934-0.103 1.853-0.719 3.543-1.707 4.954l0.020-0.031c-1.652 2.366-4.328 3.919-7.371 4.011l-0.014 0c-0.123 0.006-0.268 0.009-0.414 0.009-1.73 0-3.347-0.482-4.725-1.319l0.040 0.023c-2.508-1.509-4.238-4.091-4.558-7.094l-0.004-0.041c-0.025-0.625-0.037-1.25-0.012-1.862 0.49-4.779 4.494-8.476 9.361-8.476 0.547 0 1.083 0.047 1.604 0.136l-0.056-0.008c0.025 1.849-0.050 3.699-0.050 5.548-0.423-0.153-0.911-0.242-1.42-0.242-1.868 0-3.457 1.194-4.045 2.861l-0.009 0.030c-0.133 0.427-0.21 0.918-0.21 1.426 0 0.206 0.013 0.41 0.037 0.61l-0.002-0.024c0.332 2.046 2.086 3.59 4.201 3.59 0.061 0 0.121-0.001 0.181-0.004l-0.009 0c1.463-0.044 2.733-0.831 3.451-1.994l0.010-0.018c0.267-0.372 0.45-0.822 0.511-1.311l0.001-0.014c0.125-2.237 0.075-4.461 0.087-6.698 0.012-5.036-0.012-10.060 0.025-15.083z"></path>
                        </svg>
                      </button>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Col>

            <Col>
              <div className="unique-card">
                <div className="background-overlay"></div>
                <div className="card-content carwid">
                  <div className="card-title">
                    <img src={callimg} /> {contactData && contactData.call}
                  </div>
                  <div className="card-description">
Call US Now 
                 </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Contact;
