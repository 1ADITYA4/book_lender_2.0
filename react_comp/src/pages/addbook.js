import React, { useState } from 'react';

const AddBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [rentalPrice, setRentalPrice] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !author || !genre || !rentalPrice) {
      setMessage('All fields are required.');
      return;
    }

    if (isNaN(rentalPrice) || rentalPrice <= 0) {
      setMessage('Rental price must be a positive number.');
      return;
    }

    setIsLoading(true);

    const bookDetails = { title, author, genre, rentalPrice };

    try {
      const response = await fetch('http://localhost:3000/add-book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(bookDetails),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Book added successfully!');
        setTitle('');
        setAuthor('');
        setGenre('');
        setRentalPrice('');
      } else {
        setMessage(data.message || 'Error adding book.');
      }
    } catch (error) {
      console.error('Error adding book:', error);
      setMessage('Error adding book.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto mt-8 p-4">
      <h2 className="text-2xl font-bold mb-6">Add a Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full rounded"
            aria-label="Book Title"
            required
          />
        </div>
        <div>
          <label htmlFor="author" className="block text-sm font-medium mb-1">Author</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border p-2 w-full rounded"
            aria-label="Book Author"
            required
          />
        </div>
        <div>
          <label htmlFor="genre" className="block text-sm font-medium mb-1">Genre</label>
          <input
            type="text"
            id="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="border p-2 w-full rounded"
            aria-label="Book Genre"
            required
          />
        </div>
        <div>
          <label htmlFor="rentalPrice" className="block text-sm font-medium mb-1">Rental Price</label>
          <input
            type="number"
            id="rentalPrice"
            value={rentalPrice}
            onChange={(e) => setRentalPrice(e.target.value)}
            className="border p-2 w-full rounded"
            aria-label="Rental Price"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
          disabled={isLoading}
        >
          {isLoading ? 'Adding...' : 'Add Book'}
        </button>
      </form>
      {message && <div className="mt-4 text-sm text-green-600">{message}</div>}
    </div>
  );
};

export default AddBook;