// backend/models/Book.js
const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  description: { type: String, default: '' },
  condition: { type: String, default: 'Good' },
  rentalPrice: { type: Number, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  coverImage: { type: String, default: '' },
  ratings: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, rating: { type: Number, min: 1, max: 5 } }],
  reviews: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, text: { type: String } }],
});

module.exports = mongoose.model('Book', BookSchema);