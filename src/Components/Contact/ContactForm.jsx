import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phoneNumber: '',
    message: '',
  });

  const [alert, setAlert] = useState({ show: false, message: '', variant: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://gaming-cd78d-default-rtdb.firebaseio.com/realfed.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setAlert({ show: true, message: 'Inquiry sent successfully!', variant: 'success' });
        setFormData({
          firstname: '',
          lastname: '',
          email: '',
          phoneNumber: '',
          message: '',
        });
      } else {
        throw new Error('Failed to send inquiry');
      }
    } catch (error) {
      setAlert({ show: true, message: error.message, variant: 'danger' });
    }
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <p className="register-title">Send Your Inquiry or Feedback</p>
      <p className="register-message">
        Fill your data in the form to call you
      </p>
      {alert.show && <Alert variant={alert.variant}>{alert.message}</Alert>}
      <div className="register-flex">
        <label className="register-label">
          <input
            className="register-input"
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            placeholder=""
            required
          />
          <span>Firstname</span>
        </label>
        <label className="register-label">
          <input
            className="register-input"
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            placeholder=""
            required
          />
          <span>Lastname</span>
        </label>
      </div>

      <div className="register-flex">
        <label className="register-label">
          <input
            className="register-input"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder=""
            required
          />
          <span>Email</span>
        </label>
        <label className="register-label">
          <input
            className="register-input"
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder=""
            required
          />
          <span>Phone Number</span>
        </label>
      </div>
      <label className="register-label">
        <input
          className="register-input"
          type="text"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder=""
          required
        />
        <span>Your Message</span>
      </label>

      <button className="register-submit" type="submit">Submit</button>
    </form>
  );
}

export default ContactForm;
