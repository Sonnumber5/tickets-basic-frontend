const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();

// Serve static files from the React build folder
app.use(express.static(path.join(__dirname, 'build')));

// Optional health check
app.get('/ping', (req, res) => {
  res.send('pong');
});

// All other requests return React's index.html
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
  console.info('React Server App listening on port ' + port);
});
