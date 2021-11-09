import React from 'react';
import './Header.css';
import { FaMapMarkedAlt } from 'react-icons/fa';

const Header = () => (
  <div className="Title">
    <div style={{ margin: '5px' }}>
      <FaMapMarkedAlt className="icon" />
    </div>

    <h1>Find Your Vehicles Location</h1>
  </div>
);
export default Header;
