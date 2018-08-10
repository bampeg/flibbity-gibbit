require('dotenv').config()
// modules
const express = require('express');
const bodyParser = require('body-parser')
  , massive = require('massive');

// controllers
const controller = require('./controller'); // this just helps us organize all of our methods

const app = express();

// middleware
app.use(bodyParser.json()); // parses the text as JSON and exposes the resulting object on req.body so we have easy access to it

const {
  CONNECTION_STRING,
  SERVER_PORT
} = process.env

massive(CONNECTION_STRING)
  .then(connectionObj => {
    app.set('db', connectionObj)
  })
  .catch(() => {
    console.log('Could not connect to database.')
  })

const musicList = [
  {
    id: 1,
    name: 'smooth jazz',
    songs: []
  },
  {
    id: 2,
    name: 'ma jambs',
    songs: []
  },
  {
    id: 3,
    name: 'jammin in jammies',
    songs: []
  },
  {
    id: 4,
    name: 'lame playlist name',
    songs: []
  }
];


// endpoints
app.get('/api/stuff', controller.getStuff); // get all the stuff
app.put('/api/stuff/:thingMabob', controller.getThing)
app.post('/api/stuff', controller.addStuff); // add a new thing to the stuff >> the thing to be added is being passed in on the body
app.delete('/api/stuff/:index', controller.deleteStuff); // delete a thing from the stuff >> we are using params to get the index of the thing we want to delete


app.get('/api/playlists', (req, res) => {
  const db = req.app.get('db');
  db.get_playlists().then(resp => {
    res.status(200).send(resp);
  });
});

app.put('/api/playlist', (req, res) => {
  let { id, name } = req.body;
  musicList.forEach((playListObj) => {
    if (playListObj.id === id) {
      playListObj.name = name;
    };
  });
  res.send(musicList[3])
});

// ***the functionality of this works however the frontend does not currently have any code which hits this endpoint***
app.put('/api/stuff/:index', controller.updateStuff); // edit a thing from the stuff >> we are using params to get the index of the thing we want to edit and body to get the new updated thing

// listen
app.listen(SERVER_PORT, () => console.log(`Let it do on port ${SERVER_PORT}!`));
// your server should be running on a different port from your react app
// nodemon will search on the root for index.js by default >> to make our lives easier we added {"main": "server/index.js"} to our package.json since we didn't put index.js directly on the root 
// in order to allow our front end to communicate with our backend (which are running on separate ports) we add {"proxy": "http://localhost:3032"} to our package.json >> the port number must be the same as the port your server is running on

// app.listen() creates an http.Server object which allows us to easily use our middlewares