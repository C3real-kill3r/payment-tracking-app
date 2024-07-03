import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { AiFillHome, AiFillDashboard, AiOutlineSafety } from 'react-icons/ai';

const StyledNav = styled.nav`
  background: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(128,128,128,1) 35%,rgba(255,0,0,1) 50%, rgba(128,128,128,1) 65%,rgba(0,128,0,1) 100%);
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const NavList = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  margin: 0 10px;
  padding: 5px 10px;
  border-radius: 5px;
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
    transition: background-color 0.3s;
  }
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: bold;
`;

const ProjectName = styled.div`
  display: flex;
  align-items: center;
  color: white;
  font-weight: bold;
  gap: 8px;
`;

function Navbar() {
  return (
    <StyledNav>
      <ProjectName>
        <AiOutlineSafety size={24} />
        Protest Aid Kenya
      </ProjectName>
      <NavList>
        <NavItem>
          <StyledLink to="/">
            <AiFillHome size={20} /> Home
          </StyledLink>
        </NavItem>
        <NavItem>
          <StyledLink to="/admin">
            <AiFillDashboard size={20} /> Admin Dashboard
          </StyledLink>
        </NavItem>
      </NavList>
    </StyledNav>
  );
}

export default Navbar;
