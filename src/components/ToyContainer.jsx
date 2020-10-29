import React, { Component } from 'react';


class ToyContainer extends Component {

render() {
  return (
    <div id="toy-collection">
      {this.props.toys}
    </div>
  );
}
}

export default ToyContainer;
