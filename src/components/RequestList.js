import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { faker } from '@faker-js/faker';  // Ensure this import is correct

// Styled components
const Container = styled.div`
  padding: 20px;
  font-family: 'Arial', sans-serif;
  background-color: #f9f9f9;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Filters = styled.div`
  display: flex;
  align-items: center;
`;

const ResultsCount = styled.div`
  font-weight: bold;
`;

const SearchInput = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 200px;
  margin-right: 10px;
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
`;

const ClearButton = styled.button`
  padding: 10px 15px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    background-color: #c82333;
  }
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  overflow: hidden;
  background-color: #fff;

  th, td {
    padding: 12px;
    text-align: left;
  }

  th {
    background-color: #f4f4f4;
  }

  tr {
    border-bottom: 1px solid #ddd;
  }

  tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  tr:last-child {
    border-bottom: none;
  }
`;

const StatusBadge = styled.span`
  padding: 5px 10px;
  border-radius: 20px;
  color: #fff;
  background-color: ${({ status }) => {
    switch (status) {
      case 'Pending': return '#ffc107';
      case 'Verification': return '#17a2b8';
      case 'Disputed': return '#dc3545';
      case 'Completed': return '#28a745';
      default: return '#6c757d';
    }
  }};
`;

const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const PageInfo = styled.div`
  margin-right: 20px;
`;

const PageButton = styled.button`
  padding: 6px 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 5px;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ActionButton = styled.button`
  padding: 6px 12px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const NotesButton = styled.button`
  padding: 6px 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  width: 80%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  color: #333;
  cursor: pointer;
`;

const ModalTitle = styled.h3`
  margin-top: 0;
  color: #333;
`;

function RequestList() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState({ type: '', status: '', location: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [requestsPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState('');

  useEffect(() => {
    // Simulate fetching data with random dummy data
    const generateData = () => {
      return [...Array(2300)].map((_, index) => ({
        _id: index + 1,
        user: { name: faker.person.fullName(), contact: faker.phone.number() },
        requestType: faker.helpers.arrayElement(['Injury', 'Burial']),
        status: faker.helpers.arrayElement(['Pending', 'Verification', 'Disputed', 'Completed']),
        documents: { 'Documents': faker.internet.url() },
        location: faker.helpers.arrayElement(['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret']),
        createdAt: faker.date.recent().toLocaleDateString(),
        paymentReceipt: faker.helpers.arrayElement([null, faker.internet.url()]),
        notes: faker.helpers.arrayElement([null, faker.lorem.sentence()]),
      })).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    };

    setTimeout(() => {
      setRequests(generateData());
      setLoading(false);
    }, 1000);
  }, []);

  // Calculating the correct requests to display
  const filteredRequests = requests.filter(req => 
    (filter.type ? req.requestType === filter.type : true) &&
    (filter.status ? req.status === filter.status : true) &&
    (filter.location ? req.location === filter.location : true) &&
    (req.user.name.toLowerCase().includes(search.toLowerCase()))
  );

  const indexOfLastRequest = currentPage * requestsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
  const currentRequests = filteredRequests.slice(indexOfFirstRequest, indexOfLastRequest);

  const totalPages = Math.ceil(filteredRequests.length / requestsPerPage);

  if (loading) return <p>Loading requests...</p>;
  if (error) return <p>Error loading requests: {error}</p>;

  const handleOpenModal = (note) => {
    setSelectedNote(note);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedNote('');
  };

  const clearFilters = () => {
    setFilter({ type: '', status: '', location: '' });
    setSearch('');
  };

  return (
    <Container>
      {showModal && (
        <ModalBackground onClick={handleCloseModal}>
          <ModalContainer onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={handleCloseModal}>&times;</CloseButton>
            <ModalTitle>Note</ModalTitle>
            <p>{selectedNote}</p>
          </ModalContainer>
        </ModalBackground>
      )}
      <Header>
        <Filters>
          <SearchInput
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Select value={filter.type} onChange={(e) => setFilter({...filter, type: e.target.value})}>
            <option value="">Filter by Type</option>
            <option value="Injury">Injury</option>
            <option value="Burial">Burial</option>
          </Select>
          <Select value={filter.status} onChange={(e) => setFilter({...filter, status: e.target.value})}>
            <option value="">Filter by Status</option>
            <option value="Pending">Pending</option>
            <option value="Verification">Verification</option>
            <option value="Disputed">Disputed</option>
            <option value="Completed">Completed</option>
          </Select>
          <Select value={filter.location} onChange={(e) => setFilter({...filter, location: e.target.value})}>
            <option value="">Filter by Location</option>
            <option value="Nairobi">Nairobi</option>
            <option value="Mombasa">Mombasa</option>
            <option value="Kisumu">Kisumu</option>
            <option value="Nakuru">Nakuru</option>
            <option value="Eldoret">Eldoret</option>
          </Select>
          <ClearButton onClick={clearFilters}>Clear Filters</ClearButton>
        </Filters>
        <ResultsCount>
          Total Results: {filteredRequests.length}
        </ResultsCount>
      </Header>
      <StyledTable>
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact</th>
            <th>Request Type</th>
            <th>Supporting Documents</th>
            <th>Location</th>
            <th>Payment Receipt</th>
            <th>Status</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentRequests.map((request) => (
            <tr key={request._id}>
              <td>{request.user.name}</td>
              <td>{request.user.contact}</td>
              <td>{request.requestType}</td>
              <td>
                {Object.entries(request.documents).map(([key, value]) => (
                  <p key={key}>{key}: <a href={value} target="_blank" rel="noopener noreferrer">View</a></p>
                ))}
              </td>
              <td>{request.location}</td>
              <td>{request.paymentReceipt ? <a href={request.paymentReceipt} target="_blank" rel="noopener noreferrer">View</a> : 'N/A'}</td>
              <td>
                <StatusBadge status={request.status}>{request.status}</StatusBadge>
              </td>
              <td>
                {request.notes ? (
                  <NotesButton onClick={() => handleOpenModal(request.notes)}>
                    View Notes
                  </NotesButton>
                ) : 'N/A'}
              </td>
              <td>
                <ActionButton onClick={() => console.log('Changing status...')}>
                  Change Status
                </ActionButton>
              </td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
      <Pagination>
        <PageInfo>
          Page {currentPage} of {totalPages}
        </PageInfo>
        <div>
          <PageButton onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
            &laquo;
          </PageButton>
          <PageButton onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
            &lsaquo;
          </PageButton>
          <PageButton onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
            &rsaquo;
          </PageButton>
          <PageButton onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}>
            &raquo;
          </PageButton>
        </div>
      </Pagination>
    </Container>
  );
}

export default RequestList;
