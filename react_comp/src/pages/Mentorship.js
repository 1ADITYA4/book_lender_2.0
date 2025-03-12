// src/pages/Mentorship.js

import React from 'react';
// import MentorshipBooking from '../components/MentorshipBooking';

const Mentorship = () => {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Mentorship</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Mentor Cards */}
                <div className="border p-4 rounded-lg">
                    <h2 className="text-xl font-semibold">Mentor Name</h2>
                    <p className="text-gray-600">Senior at Bennett University</p>
                    <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">Book Session</button>
                </div>
                {/* Add more mentor cards here */}
            </div>
        </div>
    );
};

export default Mentorship;