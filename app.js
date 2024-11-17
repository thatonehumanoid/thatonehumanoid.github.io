const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files
app.use(express.static('public'));

// Endpoint to get the list of posts
app.get('/posts', (req, res) => {
  const postsFolder = path.join(__dirname, 'posts');
  fs.readdir(postsFolder, (err, files) => {
    if (err) {
      console.error('Error reading posts folder:', err);
      return res.status(500).json({ error: 'Failed to load posts' });
    }
    const htmlFiles = files.filter(file => file.endsWith('.html'));
    res.json(htmlFiles);
  });
});

// Serve individual posts
app.use('/posts', express.static(path.join(__dirname, 'posts')));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
