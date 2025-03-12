import React, { useEffect, useState } from 'react';

const RentABook = () => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('');

  const fetchBooks = async () => {
    const response = await fetch(
      `http://localhost:3000/api/books?page=${currentPage}&search=${search}&genre=${genre}`
    );
    const data = await response.json();
    setBooks(data.books);
    setTotalPages(data.totalPages);
  };

  useEffect(() => {
    fetchBooks();
  }, [currentPage, search, genre]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Rent a Book</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchBooks();
        }}
        className="mb-4"
      >
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title or author"
          className="border p-2 mr-2"
        />
        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="border p-2 mr-2"
        >
          <option value="">All Genres</option>
          <option value="fiction">Fiction</option>
          <option value="non-fiction">Non-Fiction</option>
          <option value="science">Science</option>
          <option value="history">History</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Search
        </button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {books.map((book) => (
          <div key={book._id} className="border p-4 rounded-lg">
            <h3 className="text-xl font-bold">{book.title}</h3>
            <p className="text-gray-600">{book.author}</p>
            <p className="text-gray-600">{book.genre}</p>
            <p className="text-gray-600">₹{book.rentalPrice}/day</p>
            <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
              Rent
            </button>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-center">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`mx-1 px-3 py-1 border rounded ${
              currentPage === i + 1 ? 'bg-blue-500 text-white' : ''
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RentABook;