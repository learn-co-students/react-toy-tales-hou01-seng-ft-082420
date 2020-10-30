import React, { Component } from "react";

class ToyForm extends Component {
  state = {
    name: "",
    image: "",
    likes: 0,
  };

  //Generic state change function that could be super useful to learn. When given a key and value pair it sets the state of the key to the value given.
  stateChange(key, newValue) {
    this.setState({
      [key]: newValue,
    });
  }

  //This is our function to let this component react to the form, and we give it the postNewToy prop to invoke after preventing default
  submitForm = (e) => {
    e.preventDefault()
    this.props.postNewToy(this.state)
  }
  render() {
    return (
      <div className="container">
      {/* give our form the submit listener to handle or form submit with our submitForm fx */}
        <form className="add-toy-form"
        onSubmit={(e)=>this.submitForm(e)}>
          <h3>Create a toy!</h3>
          <input
            type="text"
            name="name"
            placeholder="Enter a toy's name..."
            className="input-text"
            // this is identical to the one below on ln 43. It's grabbing the event of the "change", and then passing associated values from that event to our function.
            onChange={(e)=> this.stateChange(e.target.name, e.target.value)}
          />
          <br />
          <input
            type="text"
            name="image"
            placeholder="Enter a toy's image URL..."
            className="input-text"
            onChange={(e)=> this.stateChange(e.target.name, e.target.value)}
          />
          <br />
          <input
            type="submit"
            name="submit"
            value="Create New Toy"
            className="submit"
          />
        </form>
      </div>
    );
  }
}

export default ToyForm;
