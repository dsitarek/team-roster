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

const AppNavbar = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar light expand="md" className="navbar">
        <NavbarBrand href="/">Hockey Rosters</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/playerForm">Add Player to Roster</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                {user.user}
              </DropdownToggle>
              <DropdownMenu right>
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
