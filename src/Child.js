import React from 'react'

// this is a stateless functional component
export default function Child(props) {
  // always console.log props in order to make sure you are recieving it!
  console.log(props)
  return (
    // our child component is in charge of rendering a button and connecting the method we want to run when it is clicked (the name and the method are passed by props)
    <button onClick={props.method}>{props.buttonName}</button>
  )
}