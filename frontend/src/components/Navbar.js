// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">BookHive</Link>
        <div className="space-x-4">
          <Link to="/rent" className="hover:underline">Rent a Book</Link>
          <Link to="/add" className="hover:underline">Add a Book</Link>
          <Link to="/mentorship" className="hover:underline">Mentorship</Link>
          <Link to="/community" className="hover:underline">Community</Link>
          <Link to="/profile" className="hover:underline">Profile</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;