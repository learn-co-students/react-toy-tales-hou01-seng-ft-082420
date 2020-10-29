import React, { Component } from 'react';

class ToyForm extends Component {

  //OPTION 2A: define initial state
  //OPTION 2B: create function for onChange and call addNewToy method taking in this.state

  handleSubmit = (e) => {
    e.preventDefault()
    // console.log(this.props)
    this.props.addNewToy(e.target)
  }

  render() {
    return (
      <div className="container">
        <form className="add-toy-form" onSubmit={this.handleSubmit}>
          <h3>Create a toy!</h3>
          {/* OPTION 2C: add an onChange for each input field */}
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
