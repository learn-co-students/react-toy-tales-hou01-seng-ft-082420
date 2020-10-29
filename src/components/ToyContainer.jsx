import React from 'react';
import ToyCard from './ToyCard'

const ToyContainer = (props) => {

 let generateCards = props.toys.map(toy=> <ToyCard 
 toy={toy} 
 deleteToy={props.deleteToy} 
 addLike={props.addLike}/>)

  return(
    <div id="toy-collection">
      {generateCards}
    </div>
  );
}

export default ToyContainer;
