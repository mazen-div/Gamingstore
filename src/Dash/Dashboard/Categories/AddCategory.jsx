import React, { useState } from 'react';
import { Alert, Button } from 'react-bootstrap';
import Sidebar from '../../Sidebar/Sidebar';
import { storage } from '../../../firebase'; // Import storage
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const AddCategory = () => {
    const [formData, setFormData] = useState({
        name: '',
        image: null,
    });

    const [alert, setAlert] = useState({ show: false, variant: '', message: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.image) {
            setAlert({ show: true, variant: 'danger', message: 'Please upload an image' });
            return;
        }

        const storageRef = ref(storage, `categories/${formData.image.name}`);
        uploadBytes(storageRef, formData.image).then(snapshot => {
            getDownloadURL(snapshot.ref).then(downloadURL => {
                fetch('https://gaming-cd78d-default-rtdb.firebaseio.com/categories.json')
                    .then(response => response.json())
                    .then(data => {
                        if (data && formData.name in data) {
                            setAlert({ show: true, variant: 'danger', message: 'Category already exists!' });
                        } else {
                            fetch('https://gaming-cd78d-default-rtdb.firebaseio.com/categories.json', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    name: formData.name,
                                    image: downloadURL,
                                    products: {} // Initialize with empty products
                                }),
                            })
                            .then(response => {
                                if (response.ok) {
                                    setAlert({ show: true, variant: 'success', message: 'Category added successfully!' });
                                    setFormData({ name: '', image: null });
                                } else {
                                    setAlert({ show: true, variant: 'danger', message: 'Failed to add category' });
                                    throw new Error('Failed to add category');
                                }
                            })
                            .catch(error => console.error('Error adding category:', error));
                        }
                    })
                    .catch(error => console.error('Error fetching categories:', error));
            });
        });
    };

    return (
        <div style={{marginBottom:'10px'}}>
            <center style={{margin:'10px'}}>
                <Sidebar /><br/><br/>
                <Button variant='primary' href='/dashboard'>Back To Dashboard</Button>
            </center>
            {alert.show && <Alert variant={alert.variant}>{alert.message}</Alert>}
            <form className="register-form" id='elfed' onSubmit={handleSubmit}>
                <p className="register-title">Add Category</p>
                <p className="register-message">
                    Fill data to add the category
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
                    <span>Category Name</span>
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

export default AddCategory;
