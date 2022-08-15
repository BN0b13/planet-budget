import React from 'react';
import Nav from 'react-bootstrap/Nav';

import { tokenName } from '../../assets/config';
import logo from '../../assets/img/header-logo.png';
import './header.styles.scss';

const loggedIn = ({ currentHomeDisplay, setCurrentHomeDisplay }) => {
  let currentLink = null;
  if(currentHomeDisplay === 'home') {
    currentLink = (
      <Nav.Link onClick={() => setCurrentHomeDisplay('profile')}>Profile</Nav.Link>
    );
  }
  if(currentHomeDisplay === 'profile') {
    currentLink = (
      <Nav.Link onClick={() => setCurrentHomeDisplay('home')}>Home</Nav.Link>
    );
  }
  if(localStorage.getItem(tokenName)) {
    return (
      <div className='logged-in-div'>
        <Nav defaultActiveKey="/" className="navbar-logged-in">
          { currentLink }
          <Nav.Link 
            onClick={() => {
              localStorage.removeItem(tokenName);
              sessionStorage.removeItem(tokenName);
              window.location = '/';
            }}
          >
            Log Out
          </Nav.Link>
        </Nav>
      </div>
    );
  }
}

const Header = ({ currentHomeDisplay, setCurrentHomeDisplay }) => {
  return (
    <div className='header'>
      <div className='logo-container'>
        <a onClick={() => setCurrentHomeDisplay('home')} >
          <img src={logo} className='logo' />
        </a>
      </div>
      <div className='options'>
        {loggedIn({ currentHomeDisplay, setCurrentHomeDisplay })}
      </div>
    </div>
  );
};

export default Header;