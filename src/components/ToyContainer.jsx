import React from 'react';
import ToyCard from './ToyCard'

const ToyContainer = (props) => {
  return(
    <div id="toy-collection">
      {props.allToys.map( toy =>{
        return(
          <ToyCard  toy={toy} key= {toy.id} likeToy={props.likeToy} deleteToy={props.deleteToy}/>
        )
      })}
    </div>
  );
}

export default ToyContainer;
