import React, { Component } from 'react';
import axios from 'axios';

import Child from './Child';

// this is a stateful class component
export default class Parent extends Component {
  constructor() {
    super();
    this.state = {
      stuff: [],
      userInput: '',
      whatThing: 0,
      playListName: '',
      playlists: []
    };
    // each of our methods below must be bound to the correct instance of our parent class, otherwise we will lose our context
    this.addStuff = this.addStuff.bind(this);
    this.deleteStuff = this.deleteStuff.bind(this);
    this.hangleInput = this.hangleInput.bind(this);
    this.clickerThingAmabob = this.clickerThingAmabob.bind(this);
  };

  // when Parent first mounts it will send a request to our server for the stuff data >> when we get our response we set it on our= state
  componentDidMount() {
    axios
      .get('/api/stuff')
      .then((response) => {
        this.setState({
          stuff: response.data,
        });
      });
    axios
      .get('/api/playlists')
      .then(response => {
        // console.log(response);
        this.setState({
          playlists: response.data
        })
      });
  };

  addStuff() {
    // below we are packing an object with the information we want to send to our server / api
    let thisIsTheBody = { thing: this.state.userInput }

    // below we are passing data to the api via the body object #thisIsTheBody
    axios
      .post('/api/stuff', thisIsTheBody)
      .then(response => {
        this.setState({
          stuff: response.data,
          userInput: ''
        });
      });
  };

  deleteStuff(indexToDelete) {
    axios
      .delete(`/api/stuff/${indexToDelete}`) // here we are adding a param to our endpoint string (using a template literal)
      .then(response => {
        // after the thing has been deleted we want to update our app to display the change
        this.setState({
          stuff: response.data
        });
      });
  };

  hangleInput(event) {
    this.setState({
      userInput: event.target.value
    });
  };

  clickerThingAmabob() {
    axios.put(`/api/stuff/${this.state.whatThing}`, { fish: 'slimy' })
  }


  updateName(id) {
    let theBodyThatIsGoingToGetPlacedOnTheRequest = { id: id, name: this.state.playListName }

    axios
      .put('/api/playlist', theBodyThatIsGoingToGetPlacedOnTheRequest)
      .then(response => {
        console.log(response)
      })
  }

  render() {
    console.log(this.state.userInput) // this is a great place to console log properties on state to see that they exist or are being changed correctly

    // here we are maping through our stuff array and wraping each thing in a div so that it will display nicely >>> we are also adding a delete button and passing it the index of that particular thing so we can delete it when clicked
    let allTheStuff = this.state.stuff
      .map((thing, i) => {
        return (
          <div className="thing" key={i}>
            <p>{thing}</p>
            <button onClick={() => this.deleteStuff(i)}>Delete</button>
          </div>
        );
      });

    let playlists = this.state.playlists.map(playlist => {
      return <div key={playlist.id}>{playlist.name}</div>
    });

    return (
      <div>
        <div>{this.state.greeting}</div>
        <input value={this.state.userInput} onChange={this.hangleInput} />

        {/* we are passing this child the addStuff method and buttonName on props */}
        <Child method={this.addStuff} buttonName="addStuff" />

        <input onChange={e => this.setState({ whatThing: e.target.value })} />
        <button onClick={this.clickerThingAmabob}>Click me!</button>

        <div className="all-the-stuff">{allTheStuff}</div>

        <input onChange={e => this.setState({ playListName: e.target.value })} />
        <button onClick={() => this.updateName(4)}>Change that Playist!</button>

        {playlists}m
      </div>
    );
  };
};