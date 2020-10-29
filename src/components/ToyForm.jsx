import React, { Component } from 'react';

class ToyForm extends Component {

  constructor() {
    super()
    this.state = {
       name: "",
       image: "",
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addToy(this.state)
  }

  handleChange = (e) => {
    let {value, name} = e.target
    this.setState({
      [name]: value
    })
  }

  render() {
    return (
      <div className="container">
        <form className="add-toy-form" onSubmit={this.handleSubmit}>
          <h3>Create a toy!</h3>
          <input type="text" name="name" placeholder="Enter a toy's name..." className="input-text" onChange={this.handleChange}/>
          <br/>
          <input type="text" name="image" placeholder="Enter a toy's image URL..." className="input-text" onChange={this.handleChange}/>
          <br/>
          <input type="submit" name="submit" value="Create New Toy" className="submit"/>
        </form>
      </div>
    );
  }

}

export default ToyForm;
