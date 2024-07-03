import React, { useState } from 'react';
import styled from 'styled-components';
import { FaPlus } from 'react-icons/fa';
import RequestForm from '../components/RequestForm';
import RequestList from '../components/RequestList';

// Styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  font-family: 'Poppins', sans-serif;  // Using Poppins as a modern font
  margin-top: 20px;
`;

const Subtitle = styled.h2`
  color: #555;
`;

const FloatingButton = styled.button`
  position: fixed;
  bottom: 30px;
  right: 30px;
  background-color: #007bff;
  color: white;
  border: none;
  padding: 15px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 24px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s, transform 0.3s;
  z-index: 1000; // Ensure it is above other content

  &:hover {
    background-color: #0056b3;
    transform: scale(1.1);
  }

  &:focus {
    outline: none;
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
  z-index: 1000; // Ensure it's above other content
`;

const ModalContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  max-width: 500px;
  z-index: 1001; // Above the background
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
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

  &:hover {
    color: #666;
  }
`;

const ModalTitle = styled.h3`
  margin-top: 0;
  color: #333;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
`;

function Home() {
    const [showForm, setShowForm] = useState(false);

    const toggleForm = () => setShowForm(!showForm);

    const handleBackgroundClick = (e) => {
        if (e.target === e.currentTarget) {
            setShowForm(false);
        }
    };

    return (
        <Container>
            {showForm && (
              <ModalBackground onClick={handleBackgroundClick}>
                <ModalContainer>
                  <CloseButton onClick={toggleForm}>&times;</CloseButton>
                  <ModalTitle>Aid Request Form</ModalTitle>
                  <RequestForm />
                </ModalContainer>
              </ModalBackground>
            )}
            <FloatingButton onClick={toggleForm}>
              <FaPlus />
            </FloatingButton>
            <Subtitle>Current Requests</Subtitle>
            <RequestList />
        </Container>
    );
}

export default Home;
