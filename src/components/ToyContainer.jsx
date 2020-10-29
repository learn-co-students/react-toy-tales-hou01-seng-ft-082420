import React from 'react';
import ToyCard from './ToyCard'

class ToyContainer extends React.Component {

  constructor() {
    super()

    this.state = {

    }
  }

  createToyCards = () => {
    console.log(this.props.toys)
    return this.props.toys.map( (toy, index) => {
      return <ToyCard
      id= {index}
      toy={toy}
      likeToy={this.props.likeToy}
      deleteToy={this.props.deleteToy}
      />
    })
  }
  
  render() {

    return(
    <div id="toy-collection">
      {this.createToyCards()}
    </div>
   );

  }
  
}

export default ToyContainer;
