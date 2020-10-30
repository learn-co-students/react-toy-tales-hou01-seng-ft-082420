import { render } from '@testing-library/react';
import React from 'react';
import ToyCard from './ToyCard'

class ToyContainer extends React.Component {
  constructor(){
    super()

    this.state ={

    }
  }

  createToyCards = () => {
    console.log('props', this.props.allToys)
    return this.props.allToys.map(toy =>(
      <ToyCard 
        toy={toy}
        deleteToy= {this.props.deleteToy}
        addLike={this.props.addLike}
      />
    ))
  }

  render() {
    return (
      <div id="toy-collection">
        {this.createToyCards()}
      </div>
    )
  }
}

export default ToyContainer;
