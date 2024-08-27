const express = require('express');
const compression = require('compression'); // Aggiunto
const path = require('path');
const app = express();

app.use(compression());

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist/work-track-fe')));

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/work-track-fe/index.html'));
});

// Start the app by listening on the default Heroku port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
