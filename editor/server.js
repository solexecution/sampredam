const express = require('express');
const path = require('path');

const app = express();
const PORT = 3333;

// Parse JSON bodies
app.use(express.json({ limit: '10mb' }));

// Serve the editor UI (no-cache for dev — ensures code changes load immediately)
app.use('/editor', express.static(path.join(__dirname, 'public'), {
  etag: false,
  maxAge: 0,
  setHeaders: (res) => res.set('Cache-Control', 'no-store'),
}));

// Serve the listing site for preview iframe (project root, excluding editor/)
app.use('/preview', express.static(path.resolve(__dirname, '..')));

// API routes
app.use('/api/config', require('./routes/api-config'));
app.use('/api/images', require('./routes/api-images'));
app.use('/api/deploy', require('./routes/api-deploy'));

// Root redirects to editor
app.get('/', (req, res) => res.redirect('/editor'));

app.listen(PORT, () => {
  console.log(`\n  Listing Editor running at http://localhost:${PORT}\n`);
});
