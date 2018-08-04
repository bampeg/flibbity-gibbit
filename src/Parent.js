import React, { Component } from 'react'
import axios from 'axios'

import Child from './Child'

// this is a stateful class component
export default class Parent extends Component {
  constructor() {
    super()
    this.state = {
      stuff: [],
      userInput: ''
    }
    // each of our methods below must be bound to the correct instance of our parent class, otherwise we will lose our context
    this.getStuff = this.getStuff.bind(this)
    this.addStuff = this.addStuff.bind(this)
    this.deleteStuff = this.deleteStuff.bind(this)
    this.editStuff = this.editStuff.bind(this)
    this.hangleInput = this.hangleInput.bind(this)
  }

  getStuff() {
    axios
      .get('/api/stuff')
      .then((response) => {
        this.setState({
          stuff: response.data
        })
      })
  }
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
        })
      })
  }
  deleteStuff(indexToDelete) {
    axios
      .delete(`/api/stuff/${indexToDelete}`) // here we are adding a param to our endpoint string (using a template literal)
      .then(response => {
        // after the thing has been deleted we want to update our app to display the change
        this.setState({
          stuff: response.data
        })
      })
  }
  editStuff(indexToEdit) {

    // let thisIsTheBody = {thing: this.state.}
    axios
      .put(`/api/stuff/${indexToEdit}`, {})
  }
  hangleInput(event) {
    this.setState({
      userInput: event.target.value
    })
  }

  render() {
    console.log(this.state.userInput) // this is a great place to console log properties on state to see that they exist or are being changed correctly

    // here we are maping through our stuff array and wraping each thing in a div so that it will display nicely >>> we are also adding a delete button and passing it the index of that particular thing so we can delete it if we click on it.
    let allTheStuff = this.state.stuff
      .map((thing, i) => {
        return (
          <div className="thing">
            <p>{thing}</p>
            <input />
            <button onClick={() => this.deleteStuff(i)}>Delete</button>
            <button onClick={() => this.editStuff(i)}>Edit</button>
          </div>
        )
      })


    return (
      <div>
        <div>{this.state.greeting}</div>
        <input value={this.state.userInput} onChange={this.hangleInput} />

        {/* we are passing this child the getStuff method and buttonName on props */}
        <Child method={this.getStuff} buttonName="getStuff" />

        {/* we are passing this child the addStuff method and buttonName on props */}
        <Child method={this.addStuff} buttonName="addStuff" />

        <div className="all-the-stuff">{allTheStuff}</div>

      </div>
    )
  }
}