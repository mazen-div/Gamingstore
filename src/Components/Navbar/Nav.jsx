import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./Nav.css";
import { Col, Row } from "react-bootstrap";
import slog from "../../assets/imgs/h-colored.png";
import headset from "../../assets/imgs/headset.png";
import mouse from "../../assets/imgs/mouse.png";
import keyboard from "../../assets/imgs/keyboard.png";
import Access from "../../assets/imgs/access.png";
import chair from '../../assets/imgs/chairs.png';
const Navy = () => {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">
            <img src={slog} width={"150px"} />
          </Navbar.Brand>
          <div className="vl d-none d-md-block"></div>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav></Nav>
            <Nav className="links ms-auto ">
              <Nav.Link href="/">Home</Nav.Link>
              <NavDropdown title="Products" id="collapsible-nav-dropdown">
                <Row>
                  <Col>
                    <NavDropdown.Item href="/cate">
                      <div className="navprod1">
                        <div className="navprodimg">
                          <img src={headset} />
                        </div>
                        <div className="navprodtitles">
                          <h4>HEADSET</h4>
                          <h6>Wireless</h6>
                          <h6>Over-ear</h6>
                          <h6>In-ear</h6>
                        </div>
                      </div>
                    </NavDropdown.Item>
                  </Col>
                  <Col>
                    <NavDropdown.Item href="/cate">
                      <div className="navprod1">
                        <div className="navprodimg">
                          <img src={mouse} />
                        </div>
                        <div className="navprodtitles">
                          <h4>MICE</h4>
                          <h6>Customizable</h6>
                          <h6>Lightweight</h6>
                          <h6>Symmetrical‍</h6>
                        </div>
                      </div>
                    </NavDropdown.Item>
                  </Col>
                  <Col>
                    <NavDropdown.Item href="/cate">
                      <div className="navprod1">
                        <div className="navprodimg">
                          <img src={Access} />
                        </div>
                        <div className="navprodtitles">
                          <h4>ACCESSORIES</h4>
                        </div>
                      </div>
                    </NavDropdown.Item>
                  </Col>
                </Row>


                <Row>
                  <Col >
                    <NavDropdown.Item href="/cate">
                      <div className="navprod1">
                        <div className="navprodimg">
                          <img src={chair} />
                        </div>
                        <div className="navprodtitles">
                          <h4>GAMING CHAIRS</h4>
                          <h6>Ergonomic</h6>
                          <h6>Chairs</h6>
                          <h6>Sofa</h6>
                        </div>
                      </div>
                    </NavDropdown.Item>
                  </Col>
                  <Col>
                    <NavDropdown.Item href="/cate">
                      <div className="navprod1">
                        <div className="navprodimg">
                          <img src='https://cougargaming.com/_cgrwdr_/wwdpp/wp-content/uploads/2022/04/mega-menu-icon_case.png' />
                        </div>
                        <div className="navprodtitles">
                          <h4>PC CASES</h4>
                        </div>
                      </div>
                    </NavDropdown.Item>
                  </Col>
                  <Col id="keybo">
                    <NavDropdown.Item href="/cate">
                      <div className="navprod1">
                        <div className="navprodimg">
                          <img src={keyboard} />
                        </div>
                        <div className="navprodtitles">
                          <h4>KEYBOARD</h4>
                          <h6>Mechanical</h6>
                          <h6>Membrane</h6>
                          <h6>scissor </h6>

                          <h6>Combo</h6>
                        </div>
                      </div>
                    </NavDropdown.Item>
                  </Col>
                 
                </Row>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/cate">
                      <div className="navprod1">
                        <div className="navprodimg">
                          <img src='https://png.pngtree.com/png-vector/20220818/ourmid/pngtree-computer-accessories-vector-or-png-png-image_6115350.png' width={'75px'} />
                        </div>
                        <div className="navprodtitles">
                          <h5>All Categories</h5>
            
                        </div>
                      </div>
                    </NavDropdown.Item>              </NavDropdown>
              <Nav.Link href="about">About us</Nav.Link>
              <Nav.Link eventKey={2} href="/contact">
                Contact US
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Navy;
