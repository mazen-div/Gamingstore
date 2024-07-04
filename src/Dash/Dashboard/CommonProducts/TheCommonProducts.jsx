import React, { useState, useEffect } from 'react';
import { Container, Button, Alert, Table } from 'react-bootstrap';
import Sidebar from '../../Sidebar/Sidebar'; // Make sure to import your Sidebar component

const TheCommonProducts = () => {
  const [products, setProducts] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);
  const [editedProduct, setEditedProduct] = useState({ name: '', image: '' });
  const [alert, setAlert] = useState({ show: false, message: '', variant: '' });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://gaming-cd78d-default-rtdb.firebaseio.com/common.json');
      const data = await response.json();
      const formattedProducts = Object.keys(data).map(key => ({ id: key, ...data[key] }));
      setProducts(formattedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleEditClick = (id, product) => {
    setEditingProductId(id);
    setEditedProduct(product);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedProduct({ ...editedProduct, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveClick = async (id) => {
    try {
      const response = await fetch(`https://gaming-cd78d-default-rtdb.firebaseio.com/common/${id}.json`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedProduct)
      });

      if (response.ok) {
        setAlert({ show: true, message: 'Product updated successfully!', variant: 'success' });
        fetchProducts();
        setEditingProductId(null);
      } else {
        throw new Error('Failed to update product');
      }
    } catch (error) {
      setAlert({ show: true, message: error.message, variant: 'danger' });
    }
  };

  const handleDeleteClick = async (id) => {
    try {
      const response = await fetch(`https://gaming-cd78d-default-rtdb.firebaseio.com/common/${id}.json`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setAlert({ show: true, message: 'Product deleted successfully!', variant: 'success' });
        fetchProducts();
      } else {
        throw new Error('Failed to delete product');
      }
    } catch (error) {
      setAlert({ show: true, message: error.message, variant: 'danger' });
    }
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
        <Table bordered>
          <thead>
            <tr>
              <th>Common Product Name</th>
              <th>Common Product Image</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>
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
                <td>
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
                <td>
                  {editingProductId === product.id ? (
                    <Button onClick={() => handleSaveClick(product.id)}>Save</Button>
                  ) : (
                    <Button onClick={() => handleEditClick(product.id, product)}>Edit</Button>
                  )}
                </td>
                <td>
                  <Button variant="danger" onClick={() => handleDeleteClick(product.id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default TheCommonProducts;
