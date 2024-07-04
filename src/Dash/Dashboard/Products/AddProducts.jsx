import React, { useState, useEffect } from 'react';
import { Button, Alert } from 'react-bootstrap';
import Sidebar from '../../Sidebar/Sidebar';
import { storage } from '../../../firebase'; // Import storage
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const AddProducts = () => {
    const [formData, setFormData] = useState({
        name: '',
        image: null,
        description: '',
        category: '',
        price: ''
    });
    const [categories, setCategories] = useState([]);
    const [alert, setAlert] = useState({ show: false, variant: '', message: '' });

    useEffect(() => {
        fetch('https://gaming-cd78d-default-rtdb.firebaseio.com/categories.json')
            .then(response => response.json())
            .then(data => {
                const categoryArray = [];
                Object.keys(data).forEach(categoryId => {
                    categoryArray.push({
                        id: categoryId,
                        name: data[categoryId].name
                    });
                });
                setCategories(categoryArray);
            })
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.category) {
            setAlert({ show: true, variant: 'danger', message: 'Please select a valid category' });
            return;
        }

        const selectedCategory = categories.find(category => category.id === formData.category);

        if (!selectedCategory) {
            setAlert({ show: true, variant: 'danger', message: 'Selected category does not exist' });
            return;
        }

        const storageRef = ref(storage, `products/${formData.image.name}`);
        uploadBytes(storageRef, formData.image).then(snapshot => {
            getDownloadURL(snapshot.ref).then(downloadURL => {
                fetch(`https://gaming-cd78d-default-rtdb.firebaseio.com/categories/${selectedCategory.id}/products.json`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: formData.name,
                        image: downloadURL,
                        description: formData.description,
                        price: formData.price
                    }),
                })
                .then(response => {
                    if (response.ok) {
                        setAlert({ show: true, variant: 'success', message: 'Product added successfully!' });
                        setFormData({ name: '', image: null, description: '', category: '', price: '' });
                    } else {
                        setAlert({ show: true, variant: 'danger', message: 'Failed to add product' });
                        throw new Error('Failed to add product');
                    }
                })
                .catch(error => console.error('Error adding product:', error));
            });
        });
    };

    return (
        <div style={{ marginBottom: '10px' }}>
            <center style={{ margin: '10px' }}>
                <Sidebar /><br /><br />
                <Button variant='primary' href='/dashboard'>Back To Dashboard</Button>
            </center>
            {alert.show && <Alert variant={alert.variant}>{alert.message}</Alert>}
            <form className="register-form" id='elfed' onSubmit={handleSubmit}>
                <p className="register-title">Add Product</p>
                <p className="register-message">
                    Fill data to add the product
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
                    <span>Product Name</span>
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
                <label className="register-label">
                    <textarea
                        className="register-input"
                        name="description"
                        placeholder=""
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                    <span>Product Description</span>
                </label>
                <label className="register-label">
                    <input
                        className="register-input"
                        type="number"
                        name="price"
                        placeholder="   "
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                    <span>Product Price</span>
                </label>
                <label className="register-label">
                    <select
                        className="register-input"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Category</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    <span>Category</span>
                </label>
                <button className="register-submit" type="submit">Submit</button>
            </form>
        </div>
    );
}

export default AddProducts;
