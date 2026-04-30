require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
const chatRoutes = require('./routes/chatRoutes');
const electionRoutes = require('./routes/electionRoutes');

const app = express();

// Security Middlewares
app.use(helmet({
  contentSecurityPolicy: false, // Disabled for React development/build compatibility
}));
app.use(cors());
app.use(express.json());

// Rate Limiting to prevent API abuse
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', apiLimiter);

// Routes
app.use('/api/chat', chatRoutes);
app.use('/api/election', electionRoutes);

// Basic Health Check for API
app.get('/api/health', (req, res) => res.send('India Election Smart Assistant API Running'));

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../../frontend/build')));

// Handle React routing, return all other requests to React app
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../../frontend/build', 'index.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
