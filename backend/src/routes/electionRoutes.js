const express = require('express');
const router = express.Router();
const { getDashboardData } = require('../controllers/electionController');

router.post('/dashboard', getDashboardData);

module.exports = router;
