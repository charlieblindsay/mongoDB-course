const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Tour must have a name'], // Mongoose validator
    unique: true, // Cannot have 2 tour documents with the same name
    trim: true, // Removes whitespace
  },
  images: [String], // List of strings
  createdAt: {
    type: Date,
    default: Date.now(),
    selected: false, // Hides from responses. For sensitive data.
  },
  startDates: [Date],
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  duration: {
    type: Number,
    required: [true, 'A tour must have a duration'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have a group size'],
  },
  difficulty: {
    type: String,
    required: [true, 'A tour must have a difficulty'],
  },
  priceDiscount: Number,
  price: {
    type: Number,
    required: [true, 'Tour must have a price'],
  },
  summary: {
    type: String,
    trim: true,
    required: [true, 'Tour must have a summary'],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, 'A tour must have a cover image'],
  },
});

// Created a model called Tour with the tourSchema
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
