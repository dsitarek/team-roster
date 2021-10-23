import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { signOutUser } from '../api/auth';
import siteLogo from '../assets/siteLogo.png';

const AppNavbar = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar light expand="md" className="navbar">
        <NavbarBrand href="/"><img className="site-logo" src={siteLogo} alt="site logo" /></NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="container-fluid" navbar>
            <NavItem>
              <NavLink href="/team">Team</NavLink>
            </NavItem>
            <NavItem className="nav-item">
              <NavLink href="/new">Add Player to Roster</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar className="user-drop">
              <DropdownToggle nav caret>
                <img className="user-img" src={user.profileImage} alt="user" />{user.user}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>
                  <NavLink onClick={signOutUser}>Sign Out</NavLink>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

AppNavbar.propTypes = {
  user: PropTypes.shape({
    fullName: PropTypes.string,
    profileImage: PropTypes.string,
    uid: PropTypes.string,
    user: PropTypes.string,
  }).isRequired,
};

export default AppNavbar;
