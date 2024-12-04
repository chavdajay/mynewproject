const express = require('express');
const { create, getAll } = require('../Controllers/BookController');
const authenticate = require('../Middlewares/authenticate');

const router = express.Router();

router.post('/', authenticate, create);
router.get('/', authenticate, getAll);

module.exports = router;