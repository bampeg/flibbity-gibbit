const express = require('express')
const bodyParser = require('body-parser')

const app = express()
 
app.use(bodyParser.json())

// stuff
const stuff = ['shoe', 'penny', 'seahorse', 'chalk', 'lint', 'elephant']

// get all the stuff
app.get('/api/stuff', (req, res) => {
  res.status(200).send(stuff)
})
// add a new thing to the stuff
app.post('/api/stuff', (req, res) => {
  stuff.push(req.body.thing) // this takes thing off of the request body and adds it to our stuff array
  res.status(200).send(stuff) // this sends the newly updated stuff array back so we can render the new thing we added
})
// delete a thing from the stuff
app.delete('/api/stuff/:index', (req, res) => {
  stuff.splice(req.params.index, 1) // this will delete the thing from the stuff array at the index passed to us from the params object
  res.status(200).send(stuff) // this sends back the most recent version of the stuff array so we can display the change
})



app.listen(3032, () => console.log("That'll do on port 3032"))