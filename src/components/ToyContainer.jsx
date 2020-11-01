import React from 'react';
import ToyCard from './ToyCard'

const ToyContainer = (props) => {
  // console.log(props)
  //because this is a function, we have to pass props as an argument - if it were a class that
  //extended to the component, you wouldn't have to
  return(
    <div id="toy-collection">
      {props.toyCollection.map(toy => {
        return(
          <ToyCard
            key={toy.id}
            toy={toy}
            name={toy.name}
            image={toy.image}
            likes={toy.likes}
            deleteToy = {props.deleteToy}
            updateLikes = {props.updateLikes}
          />
        )
      })}
      {/* Render the collection of ToyCards */}
    </div>
  );
}

export default ToyContainer;
