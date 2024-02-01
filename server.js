//TODO
//need to fix fs.readFile
//need to add ids, ask about uuid package
//refactor? and use routes

//import express
const express = require('express');
const db = require('./db/db.json');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

uuidv4();

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
//will need to add id, likely just check last note and add 1
app.post('/api/notes', (req, res) => {
  // const { title, text } = req.body;
  const data = {
    ...req.body, 
    id: uuidv4()
  }
  console.log(data)
  console.log(db)
  db.push(data);
  fs.writeFile('./db/db.json', JSON.stringify(db), (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
    res.status(200).json(db);
   } )
});

//adds a listener for delete requests
app.delete('/api/notes/:id', (req, res) => {
  console.log(req.params.id)
  fs.readFile('./db/db.json', (err, data) => {
    if (err) {
      console.log(err);
    } else{
      console.log(data)
      const notes = JSON.parse(data);
      const filteredNotes = notes.filter((note) => note.id !== req.params.id);
      fs.writeFile('./db/db.json', JSON.stringify(filteredNotes), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
        res.status(200).json(filteredNotes);
       } )
    }
  })
})

//adds a listener for GET request
//add readfile here, then parse, then res.json
app.get('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', (err, data) => {
  if (err) {
    console.log(err);
  } else{
    console.log(data)
    res.json(JSON.parse(data))
  }
})
  
  });

  //adds a listener for GET request for each note
app.get('/api/notes/:id', (req, res) => {
  const noteId = parseInt(req.params.id);
  db.getIndexOf(db)
  res.json(db)
  });

// listen() method is responsible for listening for incoming connections on the specified port 
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);



