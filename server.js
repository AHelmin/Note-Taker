//import express
const express = require('express');
const db = require('./db/db.json')

// Import built-in Node.js package 'path' to resolve path of files that are located on the server
const path = require('path');

// Initialize an instance of Express.js
const app = express();

// Specify on which port the Express.js server will run
//with Heroku, we can't use this port so we need to modify this code
const PORT = process.env.PORT || 3001;

// Static middleware pointing to the public folder, all things requested from this folder will be granted by server
app.use(express.static('public'));

//telling express it is allowed to parse data and do something with it(ie POST AND PUT REQUESTS)
app.use(express.json())
app.use(express.urlencoded({extended: true}));

//sends the notes page when 'get started' clicked
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

//adds a listener for post requests
app.post('/api/notes', (req, res) => {
  const data = req.body;
  db.push(data);
})

//adds a listener for GET request
app.get('/api/notes', (req, res) => {
  res.json(db)
  });

// listen() method is responsible for listening for incoming connections on the specified port 
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);



