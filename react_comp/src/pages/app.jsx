// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// import React from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import RentBook from './pages/RentBook';
import AddBook from './pages/AddBook';
import Mentorship from './pages/Mentorship';
import Community from './pages/Community';
import StudyGroups from './pages/StudyGroups';
import UserProfile from './pages/UserProfile';

const App = () => {
  return (
    <>
      <Navbar />
      <Router>
        {<Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rent-book" element={<RentBook />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/mentorship" element={<Mentorship />} />
        <Route path="/community" element={<Community />} />
        <Route path="/study-groups" element={<StudyGroups />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>}
      </Router>
    </>
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<Home />} />
    //     <Route path="/rent-book" element={<RentBook />} />
    //     <Route path="/add-book" element={<AddBook />} />
    //     <Route path="/mentorship" element={<Mentorship />} />
    //     <Route path="/community" element={<Community />} />
    //     <Route path="/study-groups" element={<StudyGroups />} />
    //     <Route path="/profile" element={<UserProfile />} />
    //   </Routes>
    // </Router>
  );
};

export default App;

