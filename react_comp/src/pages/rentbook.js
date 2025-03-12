// RentABook.js
import React from 'react';

const RentABook = () => {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Rent a Book</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Book Cards */}
                <div className="border p-4 rounded-lg">
                    <h2 className="text-xl font-semibold">Book Title</h2>
                    <p className="text-gray-600">Author Name</p>
                    <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">Rent</button>
                </div>
                {/* Add more book cards here */}
            </div>
        </div>
    );
};

export default RentABook;