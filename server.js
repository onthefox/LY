/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Backend server for Long Ying Logistics
// Handles API requests to protect sensitive keys

const express = require('express');
const path = require('path');
const cors = require('cors');

// Create Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Import and use Gemini API proxy
const geminiProxy = require('./server/api/geminiProxy');
app.use('/api/gemini', geminiProxy);

// Catch-all route to serve the React app for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API endpoints available at http://localhost:${PORT}/api`);
});