import React, { Component } from 'react';

class ToyCard extends Component {

  constructor(){
    super()
    this.state = {
      id: null,
      name: '',
      image: '',
      likes: 0
    }
  }

  componentDidMount(){
    this.setState({
      id: this.props.id + 1,
      name: this.props.toy.name,
      image: this.props.toy.image,
      likes: this.props.toy.likes
    })
  }
  
  handleLike = (event) => {
    this.setState({
      likes: this.state.likes + 1
    })
    this.props.likeToy(this.state)
  }

  handleDelete = (event) => {
    this.props.deleteToy(this.props.toy)
  }

  render() {
    return (
      <div id={this.props.id} className="card">
        <h2>{this.props.toy.name /* Toy's Name */}</h2>
        <img src={this.props.toy.image /* Toy's Image */} alt={this.props.toy.name /* Toy's Name */} className="toy-avatar" />
        <p>{this.state.likes /* Toy's Likes */} Likes </p>
        <button className="like-btn" onClick={this.handleLike}>Like {'<3'}</button>
        <button className="del-btn" onClick={this.handleDelete}>Donate to GoodWill</button>
      </div>
    );
  }

}

export default ToyCard;
