const express = require('express');

// Import built-in Node.js package 'path' to resolve path of files that are located on the server
const path = require('path');

// Initialize an instance of Express.js
const app = express();

// Specify on which port the Express.js server will run
const PORT = 3001;

// Static middleware pointing to the public folder, all things requested from this folder will be granted by server
app.use(express.static('public'));

//telling express it is allowed to parse data and do something with it(ie POST AND PUT REQUESTS)
app.use(express.json())
app.use(express.urlencoded({extended: true}));

//adds a listener for post requests
app.post('/api/signup', (req, res) => {
  const data = req.body
})

// Create Express.js routes for default '/', '/send' and '/routes' endpoints
app.get('/', (req, res) => res.send('Navigate to /send or /routes'));

app.get('/send', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/sendFile.html'))
);

app.get('/routes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/routes.html'))
);

app.get('*', (req, res) =>
  res.send(
    `Make a GET request using Insomnia to <a href="http://localhost:${PORT}/api/terms">http://localhost:${PORT}/api/terms</a>`
    //can also use res.sendFile(path.join(__dirname, 'public/404.html))
    //or can use res.status(404).sendFile(path.join(__dirname, 'public/404.html))
  )
);

// listen() method is responsible for listening for incoming connections on the specified port 
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);



//adds a listener for post requests
app.post('/api/signup', (req, res) => {
  const data = req.body
})
