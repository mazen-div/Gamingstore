import React, { useState } from 'react';
import { Button, Alert } from 'react-bootstrap';
import Sidebar from '../../Sidebar/Sidebar'; // Make sure to import your Sidebar component

const CommonPage = () => {
  const [formData, setFormData] = useState({ name: '', image: '' });
  const [alert, setAlert] = useState({ show: false, message: '', variant: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      name: formData.name,
      image: formData.image
    };

    try {
      const response = await fetch("https://gaming-cd78d-default-rtdb.firebaseio.com/common.json", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
      });

      if (response.ok) {
        setAlert({ show: true, message: 'Product added successfully!', variant: 'success' });
        setFormData({ name: '', image: '' });
      } else {
        throw new Error('Failed to add product');
      }
    } catch (error) {
      setAlert({ show: true, message: error.message, variant: 'danger' });
    }
  };

  return (
    <div style={{ marginBottom: '10px' }}>
      <center style={{ margin: '10px' }}>
        <Sidebar /><br /><br />
        <Button variant='primary' href='/dashboard'>Back To Dashboard</Button>
      </center>
      {alert.show && <Alert variant={alert.variant}>{alert.message}</Alert>}
      <form className="register-form" id='elfed' onSubmit={handleSubmit}>
        <p className="register-title">Add Common Product</p>
        <p className="register-message">
          Fill data to add the Common Product
        </p>
        <label className="register-label">
          <input
            className="register-input"
            type="text"
            name="name"
            placeholder=""
            value={formData.name}
            onChange={handleChange}
            required
          />
          <span>Common Product Name</span>
        </label>
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
        <button className="register-submit" type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CommonPage;
