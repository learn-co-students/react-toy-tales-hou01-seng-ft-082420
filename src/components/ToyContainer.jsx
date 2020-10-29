import React from 'react';
import ToyCard from './ToyCard'

const ToyContainer = (props) => {
  //console.log(props.toys)
  return(
    <div id="toy-collection">
      {props.toys.map(toy =>{
        return <ToyCard toy={toy} like={props.like} bye={props.bye}/>
      })}
    </div>
  );
}

export default ToyContainer;
