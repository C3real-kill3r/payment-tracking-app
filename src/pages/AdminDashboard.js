import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { faker } from '@faker-js/faker';  // Ensure this import is correct
import RequestList from '../components/RequestList';

function AdminDashboard() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        generateDummyData();
    }, []);

    const generateDummyData = () => {
        try {
            const dummyData = [...Array(100)].map((_, index) => ({
                _id: index + 1,
                user: { name: faker.person.fullName(), contact: faker.phone.number() },
                requestType: faker.helpers.arrayElement(['Injury', 'Burial']),
                status: faker.helpers.arrayElement(['Pending', 'Verification', 'Disputed', 'Completed']),
                documents: { 'Documents': faker.internet.url() },
                location: faker.helpers.arrayElement(['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret']),
                createdAt: faker.date.recent().toLocaleDateString(),
                paymentReceipt: faker.helpers.arrayElement([null, faker.internet.url()]),
                notes: faker.helpers.arrayElement([null, faker.lorem.sentence()]),
            }));
            setRequests(dummyData);
            setLoading(false);
        } catch (error) {
            setError(error.toString());
            setLoading(false);
        }
    };

    const handleStatusChange = async (id, newStatus, paymentReceipt) => {
        try {
            const updatedRequests = requests.map(request => 
                request._id === id ? { ...request, status: newStatus, paymentReceipt } : request
            );
            setRequests(updatedRequests);
        } catch (error) {
            console.error('Failed to update status:', error);
        }
    };

    if (loading) return <p>Loading requests...</p>;
    if (error) return <p>Error loading requests: {error}</p>;

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <RequestList 
                requests={requests} 
                onStatusChange={handleStatusChange} 
                isAdmin={true} 
            />
            <Link to="/">Back to Home</Link>
        </div>
    );
}

export default AdminDashboard;
