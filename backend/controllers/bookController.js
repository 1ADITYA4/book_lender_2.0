// controllers/bookController.js
const Book = require('../models/Book');

const addBook = async (req, res) => {
  const { title, author, genre, rentalPrice } = req.body;

  try {
    const book = new Book({ title, author, genre, rentalPrice });
    await book.save();
    res.status(201).json({ message: 'Book added successfully!', book });
  } catch (error) {
    res.status(500).json({ message: 'Error adding book.', error });
  }
};

const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books.', error });
  }
};

module.exports = { addBook, getBooks };