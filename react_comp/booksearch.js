import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

const BookSearch = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchBooks();
  }, [search, genre, currentPage]);

  const fetchBooks = async () => {
    try {
      const response = await fetch(`http://localhost:3000/books?page=${currentPage}&search=${search}&genre=${genre}`);
      const data = await response.json();
      setBooks(data.books);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleGenreChange = (e) => {
    setGenre(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Search Books</h2>
        <div className="flex items-center">
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search by title or author"
            className="flex-grow border p-2 mr-2"
          />
          <select
            value={genre}
            onChange={handleGenreChange}
            className="border p-2 mr-2"
          >
            <option value="">All Genres</option>
            <option value="fiction">Fiction</option>
            <option value="non-fiction">Non-Fiction</option>
            <option value="science">Science</option>
            <option value="history">History</option>
          </select>
          <button
            onClick={fetchBooks}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {books.map(book => (
          <div key={book._id} className="bg-white shadow-md rounded px-8 pt-6 pb-8">
            <h3 className="font-bold text-xl mb-2">{book.title}</h3>
            <p>Author: {book.author}</p>
            <p>Genre: {book.genre}</p>
            <p>Rental Price: ${book.rentalPrice}/week</p>
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Rent Now
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`mx-1 px-3 py-1 border rounded ${
              currentPage === page ? 'bg-blue-500 text-white' : ''
            }`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BookSearch;