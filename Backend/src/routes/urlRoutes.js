const express = require('express');
const router = express.Router();
const urlController = require('../controllers/urlController');
const { verifyToken } = require('../middleware/authMiddleware');

// POST route to create a shortened URL
router.post('/shorten', verifyToken, urlController.shortenUrl);

// GET route to retrieve all URLs
router.get('/urls', verifyToken, urlController.getAllUrls);

// POST route to update a URL's custom name
router.post('/urls/:id/update', verifyToken, urlController.updateCustomName);

// GET route to redirect to the original URL using short URL
router.get('/:shortUrl', urlController.redirectUrl);

module.exports = router;
