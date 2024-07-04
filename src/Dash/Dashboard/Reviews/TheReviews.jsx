import React, { useState, useEffect } from 'react';
import { Alert, Button } from 'react-bootstrap';
import './TheReviews.css';
import Sidebar from '../../Sidebar/Sidebar';
import { storage } from '../../../firebase'; // Import storage
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const TheReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editedReview, setEditedReview] = useState({});
  const [editedImageFile, setEditedImageFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    fetch('https://gaming-cd78d-default-rtdb.firebaseio.com/reviews.json')
      .then(response => response.json())
      .then(data => {
        const formattedReviews = Object.entries(data).map(([id, review]) => ({
          id,
          ...review
        }));
        setReviews(formattedReviews);
      })
      .catch(error => console.error('Error fetching reviews:', error));
  }, []);

  const handleEdit = (id) => {
    setEditingReviewId(id);
    const reviewToEdit = reviews.find(review => review.id === id);
    setEditedReview({ ...reviewToEdit });
  };

  const handleFileChange = (e) => {
    setEditedImageFile(e.target.files[0]);
  };

  const handleSaveEdit = (id) => {
    if (editedImageFile) {
      const storageRef = ref(storage, `images/${editedImageFile.name}`);
      
      uploadBytes(storageRef, editedImageFile).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          const updatedReviewData = {
            ...editedReview,
            imageLink: downloadURL
          };
          
          updateReview(id, updatedReviewData);
        });
      });
    } else {
      updateReview(id, editedReview);
    }
  };

  const updateReview = (id, updatedReviewData) => {
    fetch(`https://gaming-cd78d-default-rtdb.firebaseio.com/reviews/${id}.json`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedReviewData),
    })
    .then(response => {
      if (response.ok) {
        const updatedReviews = reviews.map(review =>
          review.id === id ? { ...review, ...updatedReviewData } : review
        );
        setReviews(updatedReviews);
        setEditingReviewId(null);
        setEditedReview({});
        setEditedImageFile(null);
        setSuccessMessage(`Review edited successfully.`);
      } else {
        console.error('Failed to save edit for review:', response.statusText);
      }
    })
    .catch(error => console.error('Error saving edit for review:', error));
  };

  const handleDelete = (id) => {
    fetch(`https://gaming-cd78d-default-rtdb.firebaseio.com/reviews/${id}.json`, {
      method: 'DELETE',
    })
    .then(response => {
      if (response.ok) {
        const updatedReviews = reviews.filter(review => review.id !== id);
        setReviews(updatedReviews);
        setSuccessMessage(`Review deleted successfully.`);
      } else {
        console.error('Failed to delete review:', response.statusText);
      }
    })
    .catch(error => console.error('Error deleting review:', error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedReview(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="container">
      <center style={{margin:'10px'}}>
        <Sidebar /><br/><br/>
        <Button variant='primary' href='/dashboard'>Back To Dashboard</Button>
      </center>
      <h2 className="headlined">Edit or Delete Feedback</h2>
      {successMessage && (
        <Alert variant="success" onClose={() => setSuccessMessage(null)} dismissible>
          {successMessage}
        </Alert>
      )}
      <table className="review-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Image Link</th>
            <th>Message</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map(review => (
            <tr key={review.id}>
              <td>{editingReviewId === review.id ? (
                <input
                  type="text"
                  name="firstname"
                  value={editedReview.firstname || ''}
                  onChange={handleInputChange}
                />
              ) : review.firstname}</td>
              <td>{editingReviewId === review.id ? (
                <input
                  type="text"
                  name="lastname"
                  value={editedReview.lastname || ''}
                  onChange={handleInputChange}
                />
              ) : review.lastname}</td>
              <td>{editingReviewId === review.id ? (
                <>
                  <input
                    type="file"
                    name="image"
                    onChange={handleFileChange}
                  />
                  {editedReview.imageLink && (
                    <img src={editedReview.imageLink} alt="Reviewer" width="100" height="100" />
                  )}
                </>
              ) : (
                <img src={review.imageLink} alt="Reviewer" width="100" height="100" />
              )}</td>
              <td>{editingReviewId === review.id ? (
                <input
                  type="text"
                  name="message"
                  value={editedReview.message || ''}
                  onChange={handleInputChange}
                />
              ) : review.message}</td>
              <td>{editingReviewId === review.id ? (
                <button className="save-edit-btn" onClick={() => handleSaveEdit(review.id)}>Save</button>
              ) : (
                <button className="edit-btn" onClick={() => handleEdit(review.id)}>Edit</button>
              )}</td>
              <td><button className="delete-btn" onClick={() => handleDelete(review.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TheReviews;
