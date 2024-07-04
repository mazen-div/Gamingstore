import React from 'react';
import './Nav.css';
import Container from 'react-bootstrap/Container';

import phone from '../../assets/imgs/phone.gif'

const Head = () => {
    return (
    <Container fluid className='heade'>
      <article id='phoneheader'><img src={phone} width={'30px'}/> Call Us : 0123456789</article>
      </Container>
    );
}

export default Head;
