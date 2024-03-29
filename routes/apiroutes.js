const router = require('express').Router();
const path = require('path');
const db = require('../db/db.json');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

//adds a listener for post requests
router.post('/notes', (req, res) => {
    // const { title, text } = req.body;
    //should readfile first, then parse***********
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            const notes = JSON.parse(data);
            const newData = {
                ...req.body,
                id: uuidv4()
            }
            notes.push(newData);
            fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
                if (err) throw err;
                console.log('The file has been saved!');
                res.status(200).json(notes);
            })
        }
    })
})

//adds a listener for delete requests
router.delete('/notes/:id', (req, res) => {
    console.log(req.params.id)
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            const notes = JSON.parse(data);
            const filteredNotes = notes.filter((note) => note.id !== req.params.id);
            fs.writeFile('./db/db.json', JSON.stringify(filteredNotes), (err) => {
                if (err) throw err;
                res.status(200).json(filteredNotes);
            })
        }
    })
})

//adds a listener for GET request
router.get('/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.json(JSON.parse(data))
        }
    })
});

//adds a listener for GET request for each note
router.get('/notes/:id', (req, res) => {
    const noteId = parseInt(req.params.id);
    db.getIndexOf(db)
    res.json(db)
});

module.exports = router;