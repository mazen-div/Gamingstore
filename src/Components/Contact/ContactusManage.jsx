import React, { useState, useEffect } from 'react';
import { Table, Container, Button, Alert } from 'react-bootstrap';
import Sidebar from '../../Dash/Sidebar/Sidebar';

const ContactUSManage = () => {
    const [contactData, setContactData] = useState({});
    const [editingField, setEditingField] = useState('');
    const [newData, setNewData] = useState('');
    const [alert, setAlert] = useState({ show: false, message: '', variant: '' });

    const fetchContactData = async () => {
        try {
            const response = await fetch('https://gaming-cd78d-default-rtdb.firebaseio.com/contact.json');
            if (!response.ok) {
                throw new Error('Failed to fetch contact data');
            }
            const data = await response.json();
            setContactData(data);
        } catch (error) {
            setAlert({ show: true, message: error.message, variant: 'danger' });
        }
    };

    useEffect(() => {
        fetchContactData();
    }, []);

    const handleEdit = async (field) => {
        setEditingField(field);
        setNewData(contactData[field]);
    };

    const handleChange = (e) => {
        setNewData(e.target.value);
    };

    const handleSave = async () => {
        try {
            const response = await fetch('https://gaming-cd78d-default-rtdb.firebaseio.com/contact.json', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...contactData, [editingField]: newData }),
            });
            if (!response.ok) {
                throw new Error('Failed to update contact data');
            }
            setAlert({ show: true, message: 'Contact data updated successfully', variant: 'success' });
            setEditingField('');
            setNewData('');
            // Refresh contact data after update
            fetchContactData();
        } catch (error) {
            setAlert({ show: true, message: error.message, variant: 'danger' });
        }
    };

    return (
        <Container className="my-5">
                   <center style={{ margin: '10px' }}>
        <Sidebar /><br /><br />
        <Button variant='primary' href='/dashboard'>Back To Dashboard</Button>
      </center>
            <h2 className="text-center mb-4">Manage Contact Information</h2>
            {alert.show && <Alert variant={alert.variant} onClose={() => setAlert({ show: false })} dismissible>{alert.message}</Alert>}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Field</th>
                        <th>Value</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(contactData).map(([field, value]) => (
                        <tr key={field}>
                            <td>{field}</td>
                            <td>
                                {editingField === field ? (
                                    <input type="text" value={newData} onChange={handleChange} />
                                ) : (
                                    value
                                )}
                            </td>
                            <td>
                                {editingField === field ? (
                                    <Button variant="success" onClick={handleSave}>Save</Button>
                                ) : (
                                    <Button variant="primary" onClick={() => handleEdit(field)}>Edit</Button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default ContactUSManage;
