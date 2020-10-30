import React from "react";
import ToyCard from "./ToyCard";

const ToyContainer = (props) => {
  return (
    <div id="toy-collection">
      {props.allToys.map((toy) => {
        return <ToyCard key={toy.id} toy={toy} backEndDelete={props.backEndDelete} frontEndLikePatch={props.frontEndLikePatch}/>;
      })}
    </div>
  );
};

export default ToyContainer;
