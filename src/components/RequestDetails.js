import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

function RequestDetails() {
  const { id } = useParams();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Simulate user role, should be replaced by actual authentication
  const userRole = 'admin'; // 'user' or 'admin'

  useEffect(() => {
    fetchRequestDetails();
  }, [id]);

  const fetchRequestDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/requests/${id}`);
      setRequest(response.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const updateStatus = async (newStatus, paymentReceipt = null) => {
    try {
      const payload = { status: newStatus, paymentReceipt };
      await axios.put(`http://localhost:5000/api/requests/${id}`, payload);
      fetchRequestDetails(); // Refresh data after update
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  if (loading) return <p>Loading request details...</p>;
  if (error) return <p>Error loading request details: {error}</p>;
  if (!request) return <p>No request found.</p>;

  return (
    <div>
      <h2>Request Details</h2>
      <p><strong>Name:</strong> {request.user.name}</p>
      <p><strong>Contact:</strong> {request.user.contact}</p>
      <p><strong>Type:</strong> {request.requestType}</p>
      <p><strong>Status:</strong> {request.status}</p>
      {request.paymentReceipt && (
        <p>
          <strong>Payment Receipt:</strong>
          <a href={request.paymentReceipt} target="_blank" rel="noopener noreferrer">View Receipt</a>
        </p>
      )}
      {userRole === 'admin' && (
        <div>
          {request.documents.map((doc, index) => (
            <p key={index}><strong>{doc.type}:</strong> <a href={doc.url} target="_blank" rel="noopener noreferrer">View Document</a></p>
          ))}
          <button onClick={() => updateStatus('completed')}>Mark as Completed</button>
        </div>
      )}
      <Link to="/">Back to List</Link>
    </div>
  );
}

export default RequestDetails;
