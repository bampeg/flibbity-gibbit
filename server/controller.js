// stuff
const stuff = ['shoe', 'penny', 'seahorse', 'chalk', 'lint', 'elephant'];

// controller methods
module.exports = {
    getStuff: (req, res) => {
        res.status(200).send(stuff); // simply send our stuff array
    },
    addStuff: (req, res) => {
        stuff.push(req.body.thing); // this takes thing off of the request body and adds it to our stuff array
        res.status(200).send(stuff); // this sends the newly updated stuff array back so we can render the new thing we added
    },
    deleteStuff: (req, res) => {
        stuff.splice(req.params.index, 1); // this will delete the thing from the stuff array at the index passed to us from the params object
        res.status(200).send(stuff); // this sends back the most recent version of the stuff array so we can display the change
    },
    updateStuff: (req, res) => {
        let { thingToReplaceOriginal } = req.body; // destructuring the thing we are going to replace the original thing with from the body
        let { index } = req.params; // destructuring the index passed in on params
        
        stuff[index] = thingToReplaceOriginal ;
        res.status(200).send(stuff);
    }
}