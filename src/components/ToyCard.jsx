import React, { Component } from 'react';

class ToyCard extends Component {

  handleClick = () => {
    let {toy, likeToy} = this.props
    console.log("I's be clicked")
    //we want to mess with state
    ++toy.likes //DOES update the prop BUT we can't see changes

    likeToy(toy)

  }
  render() {
    let {toy} = this.props
    return (
      <div className="card">
        <h2>{this.props.toy.name}</h2>
        <img src={toy.image} alt={toy.name} className="toy-avatar" />
        <p>{toy.likes} Likes </p>
        <button onClick={this.handleClick}className="like-btn">Like {'<3'}</button>
        <button onClick={()=>this.props.deleteToy(toy.id)}className="del-btn">Donate to GoodWill</button>
      </div>
    );
  }

}

export default ToyCard;
