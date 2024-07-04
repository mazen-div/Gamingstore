import React, { useEffect, useState } from 'react';
import { Table, Container, Alert, Button } from 'react-bootstrap';
import Sidebar from '../../Sidebar/Sidebar';

const RealFB = () => {
    const [feedbackData, setFeedbackData] = useState([]);
    const [alert, setAlert] = useState({ show: false, message: '', variant: '' });

    useEffect(() => {
        const fetchFeedbackData = async () => {
            try {
                const response = await fetch('https://gaming-cd78d-default-rtdb.firebaseio.com/realfed.json');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                const feedbackArray = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key],
                }));
                setFeedbackData(feedbackArray);
            } catch (error) {
                setAlert({ show: true, message: error.message, variant: 'danger' });
            }
        };

        fetchFeedbackData();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`https://gaming-cd78d-default-rtdb.firebaseio.com/realfed/${id}.json`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete feedback');
            }
            setFeedbackData(feedbackData.filter(feedback => feedback.id !== id));
            setAlert({ show: true, message: 'Feedback deleted successfully', variant: 'success' });
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
            <h2 className="text-center mb-4">User Feedback</h2>
            {alert.show && <Alert variant={alert.variant} onClose={() => setAlert({ show: false })} dismissible>{alert.message}</Alert>}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Message</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {feedbackData.map((feedback) => (
                        <tr key={feedback.id}>
                            <td>{feedback.firstname}</td>
                            <td>{feedback.lastname}</td>
                            <td>{feedback.email}</td>
                            <td>{feedback.phoneNumber}</td>
                            <td>{feedback.message}</td>
                            <td>
                                <Button variant="danger" onClick={() => handleDelete(feedback.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default RealFB;
