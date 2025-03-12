const express = require('express');
const Book = require('../models/Book');
const router = express.Router();

router.get('/', async (req, res) => {
  const { page = 1, limit = 10, search, genre } = req.query;
  let query = {};

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { author: { $regex: search, $options: 'i' } },
    ];
  }

  if (genre) {
    query.genre = genre;
  }

  try {
    const books = await Book.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Book.countDocuments(query);

    res.json({
      books,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books', error: error.message });
  }
});

module.exports = router;
