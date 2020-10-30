import React, { Component } from 'react';

class ToyForm extends Component {

  handleSubmit = (e) => {
    e.preventDefault()
    console.log(e.target[0].value)
    console.log(e.target[1].value)
    //adding a toy
    // means having a Toy Object 
    let newToy = {
      "name": e.target[0].value,
      "image": e.target[1].value,
      "likes": 0
    }
    this.props.addToy(newToy)
  }
  render() {
    return (
      <div className="container">
        <form className="add-toy-form" onSubmit={this.handleSubmit} >
          <h3>Create a toy!</h3>
          <input type="text" name="name" placeholder="Enter a toy's name..." className="input-text"/>
          <br/>
          <input type="text" name="image" placeholder="Enter a toy's image URL..." className="input-text"/>
          <br/>
          <input type="submit" name="submit" value="Create New Toy" className="submit"/>
        </form>
      </div>
    );
  }

}

export default ToyForm;
