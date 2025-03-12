// Community.js
import React from 'react';

const Community = () => {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Community Hub</h1>
            <div className="space-y-4">
                <div className="border p-4 rounded-lg">
                    <h2 className="text-xl font-semibold">Discussion Topic</h2>
                    <p className="text-gray-600">Join the discussion about...</p>
                    <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">Join</button>
                </div>
                {/* Add more discussion topics here */}
            </div>
        </div>
    );
};

export default Community;