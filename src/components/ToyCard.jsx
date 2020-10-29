import React, { Component } from 'react';

class ToyCard extends Component {


  handleClick = () => {
    this.props.deleteToy(this.props.toy.id)
  }

  handleLike = () => {
    this.props.addLike(this.props.toy)
  }

  render() {
    return (
      <div className="card">
        <h2>{this.props.toy.name}</h2>
        <img src={this.props.toy.image} alt={this.props.toy.name} className="toy-avatar" />
        <p>{this.props.toy.likes} Likes </p>
        <button className="like-btn" onClick={this.handleLike}>Like {'<3'}</button>
        <button className="del-btn" onClick={this.handleClick}>Donate to GoodWill</button>
      </div>
    );
  }

}

export default ToyCard;
