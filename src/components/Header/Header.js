import React from 'react';
import './Header.css';
import { FaMapMarkedAlt } from 'react-icons/fa';

const Header = () => (
  <div className="Title">
    <div className="div_icon">
      <FaMapMarkedAlt className="icon" />
    </div>
    <h1 className="gradient-text">Find Your Vehicles Location</h1>
  </div>
);
export default Header;
