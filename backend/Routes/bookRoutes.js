const express = require('express');
const { create, getAll } = require('../Controllers/BookController');
const authenticate = require('../Middlewares/authenticate');

const router = express.Router();

// Create a book (Protected Route)
router.post('/', authenticate, create);

// Get all books (Protected Route)
router.get('/', authenticate, getAll);

module.exports = router;