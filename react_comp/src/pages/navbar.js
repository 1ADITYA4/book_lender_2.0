// src/components/Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">BookBuddy</h1>
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/" className="hover:text-blue-200">Home</Link></li>
            <li><Link to="/rent-book" className="hover:text-blue-200">Rent a Book</Link></li>
            <li><Link to="/add-book" className="hover:text-blue-200">Add a Book</Link></li>
            <li><Link to="/mentorship" className="hover:text-blue-200">Mentorship</Link></li>
            <li><Link to="/community" className="hover:text-blue-200">Community</Link></li>
            <li><Link to="/study-groups" className="hover:text-blue-200">Study Groups</Link></li>
            <li><Link to="/profile" className="hover:text-blue-200">Profile</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;