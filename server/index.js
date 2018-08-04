// modules
const express = require('express');
const bodyParser = require('body-parser');

// controllers
const controller = require('./controller'); // this just helps us organize all of our methods

const app = express();

// middleware
app.use(bodyParser.json()); // parses the text as JSON and exposes the resulting object on req.body so we have easy access to it

// endpoints
app.get('/api/stuff', controller.getStuff); // get all the stuff
app.post('/api/stuff', controller.addStuff); // add a new thing to the stuff >> the thing to be added is being passed in on the body
app.delete('/api/stuff/:index', controller.deleteStuff); // delete a thing from the stuff >> we are using params to get the index of the thing we want to delete

// ***the functionality of this works however the frontend does not currently have any code which hits this endpoint***
app.put('/api/stuff/:index', controller.updateStuff); // edit a thing from the stuff >> we are using params to get the index of the thing we want to edit and body to get the new updated thing

// listen
app.listen(3032, () => console.log("That'll do on port 3032"));
// your server should be running on a different port from your react app
// nodemon will search on the root for index.js by default >> to make our lives easier we added {"main": "server/index.js"} to our package.json since we didn't put index.js directly on the root 
// in order to allow our front end to communicate with our backend (which are running on separate ports) we add {"proxy": "http://localhost:3032"} to our package.json >> the port number must be the same as the port your server is running on

// app.listen() creates an http.Server object which allows us to easily use our middlewares