// StudyGroups.js
import React from 'react';

const StudyGroups = () => {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Study Groups</h1>
            <div className="space-y-4">
                <div className="border p-4 rounded-lg">
                    <h2 className="text-xl font-semibold">Group Name</h2>
                    <p className="text-gray-600">Topic: Mathematics</p>
                    <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">Join Group</button>
                </div>
                {/* Add more study groups here */}
            </div>
        </div>
    );
};

export default StudyGroups;