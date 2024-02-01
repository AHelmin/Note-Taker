const router = require('express').Router();
const path = require('path');

//sends the notes page when 'get started' clicked
router.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '../public/notes.html'))
);

//homepage route
router.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '../public/index.html'))
);

//wildcard route
router.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '../public/index.html'))
);


module.exports = router;