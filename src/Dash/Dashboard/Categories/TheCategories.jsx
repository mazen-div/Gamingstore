import React, { useEffect, useState } from 'react';
import { Alert, Button, Container } from 'react-bootstrap';
import Sidebar from '../../Sidebar/Sidebar';
import { storage } from '../../../firebase'; // Import storage
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const TheCategories = () => {
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({ name: '', image: null });
  const [alert, setAlert] = useState({ show: false, variant: '', message: '' });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    fetch('https://gaming-cd78d-default-rtdb.firebaseio.com/categories.json')
      .then(response => response.json())
      .then(data => {
        let categoryArray = [];
        if (data) {
          Object.keys(data).forEach(categoryId => {
            const categoryData = data[categoryId];
            if (categoryData.categories) {
              Object.keys(categoryData.categories).forEach(subCategoryId => {
                const subCategoryData = categoryData.categories[subCategoryId];
                categoryArray.push({
                  id: subCategoryId,
                  name: subCategoryData.name,
                  img: subCategoryData.image,
                  parentId: categoryId
                });
              });
            } else {
              categoryArray.push({
                id: categoryId,
                name: categoryData.name,
                img: categoryData.image,
                parentId: null
              });
            }
          });
        }
        setCategories(categoryArray);
      })
      .catch(error => console.error('Error fetching categories:', error));
  };

  const handleEdit = (category) => {
    setEditingCategory(category.id);
    setFormData({ name: category.name, image: null });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSave = (categoryId) => {
    const categoryData = categories.find(cat => cat.id === categoryId);
    if (!formData.image) {
      setAlert({ show: true, variant: 'danger', message: 'Please upload an image' });
      return;
    }

    const storageRef = ref(storage, `categories/${formData.image.name}`);
    uploadBytes(storageRef, formData.image).then(snapshot => {
      getDownloadURL(snapshot.ref).then(downloadURL => {
        const updatedCategory = {
          ...categoryData,
          name: formData.name,
          image: downloadURL
        };

        let updateUrl = `https://gaming-cd78d-default-rtdb.firebaseio.com/categories/${categoryId}.json`;
        if (categoryData.parentId) {
          updateUrl = `https://gaming-cd78d-default-rtdb.firebaseio.com/categories/${categoryData.parentId}/categories/${categoryId}.json`;
        }

        fetch(updateUrl, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedCategory),
        })
          .then(response => {
            if (response.ok) {
              fetchCategories();
              setEditingCategory(null);
              setFormData({ name: '', image: null });
              setAlert({ show: true, variant: 'success', message: 'Category edited successfully!' });
            } else {
              throw new Error('Failed to update category');
            }
          })
          .catch(error => console.error('Error updating category:', error));
      });
    });
  };

  const handleDelete = (categoryId, parentId) => {
    let deleteUrl = `https://gaming-cd78d-default-rtdb.firebaseio.com/categories/${categoryId}.json`;
    if (parentId) {
      deleteUrl = `https://gaming-cd78d-default-rtdb.firebaseio.com/categories/${parentId}/categories/${categoryId}.json`;
    }

    fetch(deleteUrl, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          fetchCategories();
          setAlert({ show: true, variant: 'danger', message: 'Category deleted successfully!' });
        } else {
          throw new Error('Failed to delete category');
        }
      })
      .catch(error => console.error('Error deleting category:', error));
  };

  return (
    <Container style={{marginBottom:'20px'}}>
      <center style={{margin:'10px'}}>
        <Sidebar /><br/><br/>
        <Button variant='primary' href='/dashboard'>Back To Dashboard</Button>
      </center>
      <h2 className="headline">Edit or Delete Feedback</h2>
      {alert.show && <Alert variant={alert.variant}>{alert.message}</Alert>}
      <table border="1" cellPadding="10" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid black' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid black' }}>Category Name</th>
            <th style={{ border: '1px solid black' }}>Category Image</th>
            <th style={{ border: '1px solid black' }}>Edit</th>
            <th style={{ border: '1px solid black' }}>Delete</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(category => (
            <tr key={category.id}>
              <td style={{ border: '1px solid black' }}>
                {editingCategory === category.id ? (
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                ) : (
                  category.name
                )}
              </td>
              <td style={{ border: '1px solid black' }}>
                {editingCategory === category.id ? (
                  <input
                    type="file"
                    onChange={handleFileChange}
                  />
                ) : (
                  <img src={category.img} alt={category.name} style={{ width: '100px', height: '100px' }} />
                )}
              </td>
              <td style={{ border: '1px solid black' }}>
                {editingCategory === category.id ? (
                  <Button onClick={() => handleSave(category.id)}>Save</Button>
                ) : (
                  <Button onClick={() => handleEdit(category)}>Edit</Button>
                )}
              </td>
              <td style={{ border: '1px solid black' }}>
                <Button variant="danger" onClick={() => handleDelete(category.id, category.parentId)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
};

export default TheCategories;
