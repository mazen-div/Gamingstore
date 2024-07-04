import React, { useState, useEffect } from 'react';
import { Button, Container, Alert, Table } from 'react-bootstrap';

const TheMails = () => {
  const [emails, setEmails] = useState([]);
  const [alert, setAlert] = useState({ show: false, variant: '', message: '' });

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await fetch('https://gaming-cd78d-default-rtdb.firebaseio.com/maillist.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const emailList = data ? Object.keys(data).map(key => ({ id: key, email: data[key].email })) : [];
        setEmails(emailList);
      } catch (error) {
        setAlert({ show: true, variant: 'danger', message: 'Failed to fetch emails. Please try again later.' });
      }
    };

    fetchEmails();
  }, []);

  const handleDeleteClick = async (id) => {
    try {
      const response = await fetch(`https://gaming-cd78d-default-rtdb.firebaseio.com/maillist/${id}.json`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setEmails(emails.filter(email => email.id !== id));
      setAlert({ show: true, variant: 'success', message: 'Email deleted successfully.' });
    } catch (error) {
      setAlert({ show: true, variant: 'danger', message: 'Failed to delete email. Please try again later.' });
    }
  };

  return (
    <div>
      <Container style={{ marginBottom: '20px' }}>
        <center style={{ margin: '10px' }}>
          <Button variant='primary' href='/dashboard'>Back To Dashboard</Button>
        </center>
        <h2 className="headline">Manage Emails</h2>
        {alert.show && <Alert variant={alert.variant}>{alert.message}</Alert>}
        <Table bordered style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid black' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid black' }}>Email</th>
              <th style={{ border: '1px solid black' }}>Delete</th>
            </tr>
          </thead>
          <tbody>
            {emails.map(email => (
              <tr key={email.id}>
                <td style={{ border: '1px solid black' }}>{email.email}</td>
                <td style={{ border: '1px solid black' }}>
                  <Button variant="danger" onClick={() => handleDeleteClick(email.id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default TheMails;
