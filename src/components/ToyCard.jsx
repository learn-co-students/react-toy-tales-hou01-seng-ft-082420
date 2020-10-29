import React, { Component } from 'react';

class ToyCard extends Component {

  handleDeleteClick = (e) => {
    e.preventDefault()
    // console.log(this.props)
    this.props.deleteToy(this.props.toy.id)
  }

  handleUpdateClick = (e) => {
    e.preventDefault()
    this.props.updateLikes(this.props.toy.id, this.props.toy.likes)
  }

  render() {
    let toy = this.props.toy
    return (
      <div className="card">
        <h2>{toy.name}</h2>
        <img src={toy.image} alt={toy.name} className="toy-avatar" />
        <p>{toy.likes} Likes </p>
        <button onClick={this.handleUpdateClick} className="like-btn">Like {'<3'}</button>
        <button onClick={this.handleDeleteClick} className="del-btn">Donate to GoodWill</button>
      </div>
    );
  }

}

export default ToyCard;
