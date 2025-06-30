const express = require('express');
const router = express.Router();
const { getMatches } = require('../controllers/matchController');

// POST: /api/match
router.post('/', getMatches);

module.exports = router;
