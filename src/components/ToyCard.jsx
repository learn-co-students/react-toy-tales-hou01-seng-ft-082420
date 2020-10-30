import React, { Component } from 'react';

class ToyCard extends Component {

  handleClick = (e) => {
    e.target.className === 'like-btn' ?
    this.props.handleLike(this.props.toy) :
    this.props.handleDonate(this.props.toy)
  }

  render() {
    const {toy} = this.props
    return (
			<div className='card'>
				<h2>{toy.name}</h2>
				<img src={toy.image} alt={toy.name} className='toy-avatar' />
				<p>{toy.likes} Likes </p>
				<button className='like-btn' onClick={this.handleClick}>
					Like {'<3'}
				</button>
				<button className='del-btn' onClick={this.handleClick}>
					Donate to GoodWill
				</button>
			</div>
		);
  }

}

export default ToyCard;
