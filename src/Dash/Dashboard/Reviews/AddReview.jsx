import React, { useState } from 'react';
import { Col, Row, Alert, Container, Button } from 'react-bootstrap';
import Sidebar from '../../Sidebar/Sidebar';
import { storage } from '../../../firebase'; // Import storage
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const AddReview = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    message: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!imageFile) {
      alert('Please upload an image');
      return;
    }
    
    const storageRef = ref(storage, `images/${imageFile.name}`);
    
    uploadBytes(storageRef, imageFile).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        const reviewData = {
          ...formData,
          imageLink: downloadURL
        };
        
        fetch('https://gaming-cd78d-default-rtdb.firebaseio.com/reviews.json', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(reviewData),
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to add review');
          }
          setShowAlert(true);
          setFormData({
            firstname: '',
            lastname: '',
            message: ''
          });
          setImageFile(null);
        })
        .catch(error => console.error('Error adding review:', error));
      });
    });
  };

  return (
    <Container>
      <Row>
        <center style={{margin:'10px'}}>
          <Sidebar /><br/><br/>
          <Button variant='primary' href='/dashboard'>Back To Dashboard</Button>
        </center>
        <Col>
          {showAlert && (
            <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
              Review added successfully!
            </Alert>
          )}
          <form className="register-form" id='elfed' onSubmit={handleSubmit}>
            <p className="register-title">Add Review</p>
            <p className="register-message">
              Fill data to add the review
            </p>
            <div className="register-flex">
              <label className="register-label">
                <input
                  className="register-input"
                  type="text"
                  name="firstname"
                  placeholder=""
                  value={formData.firstname}
                  onChange={handleChange}
                  required
                />
                <span>Firstname</span>
              </label>
              <label className="register-label">
                <input
                  className="register-input"
                  type="text"
                  name="lastname"
                  placeholder=""
                  value={formData.lastname}
                  onChange={handleChange}
                  required
                />
                <span>Lastname</span>
              </label>
            </div>
            <label className="register-label">
              <input
                className="register-input"
                type="file"
                name="image"
                onChange={handleFileChange}
                required
              />
              <span>Upload Image</span>
            </label>
            <label className="register-label">
              <input
                className="register-input"
                type="text"
                name="message"
                placeholder=""
                value={formData.message}
                onChange={handleChange}
                required
              />
              <span>Your Message</span>
            </label>
            <button className="register-submit" type="submit">Submit</button>
          </form>
          <br />
        </Col>
      </Row>
    </Container>
  );
}

export default AddReview;
