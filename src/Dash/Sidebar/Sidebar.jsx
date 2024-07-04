import React, { useState } from 'react';
import { Button, Offcanvas, Nav } from 'react-bootstrap';

function Sidebar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Open Sidebar
      </Button>

      <Offcanvas show={show} onHide={handleClose} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Sidebar</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
          <Nav.Link href="/dashboard">Dashboard</Nav.Link>
      <Nav.Link href="/addproduct">Add Product</Nav.Link>
      <Nav.Link href="/addreview">Add Review</Nav.Link>
      <Nav.Link href="/addcategory">Add Category</Nav.Link>
      <Nav.Link href="/theproducts">Products</Nav.Link>
      <Nav.Link href="/thereviews">Reviews</Nav.Link>
      <Nav.Link href="/thecategories">Categories</Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Sidebar;
