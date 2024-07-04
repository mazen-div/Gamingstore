import React, { useState, useEffect } from 'react';
import { Container, Alert, Button } from 'react-bootstrap';
import Sidebar from '../../Sidebar/Sidebar';
import { storage } from '../../../firebase'; // Import storage
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const TheProducts = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [products, setProducts] = useState([]);
    const [editingProductId, setEditingProductId] = useState(null);
    const [editedProduct, setEditedProduct] = useState({});
    const [alert, setAlert] = useState({ show: false, variant: '', message: '' });

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = () => {
        fetch('https://gaming-cd78d-default-rtdb.firebaseio.com/categories.json')
            .then(response => response.json())
            .then(data => {
                const categoryOptions = [];
                if (data) {
                    Object.keys(data).forEach(categoryId => {
                        const categoryData = data[categoryId];
                        categoryOptions.push({
                            id: categoryId,
                            name: categoryData.name
                        });
                    });
                }
                setCategories(categoryOptions);
            })
            .catch(error => console.error('Error fetching categories:', error));
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        fetchProducts(e.target.value);
    };

    const fetchProducts = (categoryId) => {
        if (!categoryId) return;
        fetch(`https://gaming-cd78d-default-rtdb.firebaseio.com/categories/${categoryId}/products.json`)
            .then(response => response.json())
            .then(data => {
                const productArray = [];
                if (data) {
                    Object.keys(data).forEach(productId => {
                        const productData = data[productId];
                        productArray.push({
                            id: productId,
                            ...productData
                        });
                    });
                }
                setProducts(productArray);
            })
            .catch(error => console.error('Error fetching products:', error));
    };

    const handleEditClick = (productId, productData) => {
        setEditingProductId(productId);
        setEditedProduct(productData);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedProduct({ ...editedProduct, [name]: value });
    };

    const handleFileChange = (e) => {
        setEditedProduct({ ...editedProduct, image: e.target.files[0] });
    };

    const handleSaveClick = (productId) => {
        if (editedProduct.image instanceof File) {
            const storageRef = ref(storage, `products/${editedProduct.image.name}`);
            uploadBytes(storageRef, editedProduct.image).then(snapshot => {
                getDownloadURL(snapshot.ref).then(downloadURL => {
                    updateProduct(productId, downloadURL);
                });
            });
        } else {
            updateProduct(productId, editedProduct.image);
        }
    };

    const updateProduct = (productId, imageURL) => {
        fetch(`https://gaming-cd78d-default-rtdb.firebaseio.com/categories/${selectedCategory}/products/${productId}.json`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...editedProduct, image: imageURL }),
        })
        .then(response => {
            if (response.ok) {
                setAlert({ show: true, variant: 'success', message: 'Product updated successfully!' });
                setProducts(products.map(product => product.id === productId ? { ...editedProduct, image: imageURL } : product));
                setEditingProductId(null);
                setEditedProduct({});
            } else {
                setAlert({ show: true, variant: 'danger', message: 'Failed to update product' });
                throw new Error('Failed to update product');
            }
        })
        .catch(error => console.error('Error updating product:', error));
    };

    const handleDeleteClick = (productId) => {
        fetch(`https://gaming-cd78d-default-rtdb.firebaseio.com/categories/${selectedCategory}/products/${productId}.json`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                setAlert({ show: true, variant: 'success', message: 'Product deleted successfully!' });
                setProducts(products.filter(product => product.id !== productId));
            } else {
                setAlert({ show: true, variant: 'danger', message: 'Failed to delete product' });
                throw new Error('Failed to delete product');
            }
        })
        .catch(error => console.error('Error deleting product:', error));
    };

    return (
        <div>
            <Container style={{ marginBottom: '20px' }}>
                <center style={{ margin: '10px' }}>
                    <Sidebar /><br /><br />
                    <Button variant='primary' href='/dashboard'>Back To Dashboard</Button>
                </center>
                <h2 className="headline">Edit or Delete Products</h2>
                {alert.show && <Alert variant={alert.variant}>{alert.message}</Alert>}
                <select value={selectedCategory} onChange={handleCategoryChange}>
                    <option value="">Select Category</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
                <table border="1" cellPadding="10" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid black' }}>
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid black' }}>Product Name</th>
                            <th style={{ border: '1px solid black' }}>Product Image</th>
                            <th style={{ border: '1px solid black' }}>Product Description</th>
                            <th style={{ border: '1px solid black' }}>Product Price</th>
                            <th style={{ border: '1px solid black' }}>Edit</th>
                            <th style={{ border: '1px solid black' }}>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id}>
                                <td style={{ border: '1px solid black' }}>
                                    {editingProductId === product.id ? (
                                        <input
                                            type="text"
                                            name="name"
                                            value={editedProduct.name}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        product.name
                                    )}
                                </td>
                                <td style={{ border: '1px solid black' }}>
                                    {editingProductId === product.id ? (
                                        <input
                                            type="file"
                                            name="image"
                                            onChange={handleFileChange}
                                        />
                                    ) : (
                                        <img src={product.image} alt={product.name} style={{ width: '100px', height: '100px' }} />
                                    )}
                                </td>
                                <td style={{ border: '1px solid black' }}>
                                    {editingProductId === product.id ? (
                                        <textarea
                                            name="description"
                                            value={editedProduct.description}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        product.description
                                    )}
                                </td>
                                <td style={{ border: '1px solid black' }}>
                                    {editingProductId === product.id ? (
                                        <input
                                            type="number"
                                            name="price"
                                            value={editedProduct.price}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        product.price
                                    )}
                                </td>
                                <td style={{ border: '1px solid black' }}>
                                    {editingProductId === product.id ? (
                                        <Button onClick={() => handleSaveClick(product.id)}>Save</Button>
                                    ) : (
                                        <Button onClick={() => handleEditClick(product.id, product)}>Edit</Button>
                                    )}
                                </td>
                                <td style={{ border: '1px solid black' }}>
                                    <Button variant="danger" onClick={() => handleDeleteClick(product.id)}>Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Container>
        </div>
    );
}

export default TheProducts;
