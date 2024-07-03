import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import RequestDetails from '../components/RequestDetails';


function RequestPage() {
    const { id } = useParams(); // The ID of the request
    const [request, setRequest] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    if (loading) return <p>Loading request details...</p>;
    if (error) return <p>Error loading request details: {error}</p>;
    if (!request) return <p>No request found.</p>;

    return (
        <div>
            <h1>Request Details</h1>
            <RequestDetails request={request} />
            <Link to="/">Back to Home</Link>
        </div>
    );
}

export default RequestPage;
