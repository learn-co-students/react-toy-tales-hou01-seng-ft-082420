import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'


class App extends React.Component{

  constructor(){
    super();
    this.state = {
      display: false,
      toys: []
    }
  }
  
  componentDidMount(){
    fetch('http://localhost:3000/toys')
    .then(res=>res.json())
    .then(toys=>this.setState({toys:toys}))
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  addNewToy = (newToy) => {
    fetch('http://localhost:3000/toys', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept":"application/json"
      },
      body: JSON.stringify({
        name: newToy.name,
        image: newToy.image,
        likes: 0
      })
    })
    .then(res => res.json())
    .then(toy => this.setState({
      toys: [...this.state.toys, toy]
    }))
  }

  deleteToy = (toyId) => {
    fetch(`http://localhost:3000/toys/${toyId}`,{
      method:"DELETE"
    })
    .then(this.setState({
      toys: this.state.toys.filter(toy => toy.id !== toyId)
    }))
  }


  addLike = (toy) => {
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept":"application/json"
      },
      body: JSON.stringify({
        likes: (toy.likes + 1)
      })
    })
    .then(res => res.json())
    .then(adjustedToy => this.setState({
      toys: this.state.toys.map(toy => toy.id === adjustedToy.id ? adjustedToy : toy)
    }))
  }


  render(){
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm addNewToy={this.addNewToy}/>
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toys={this.state.toys} deleteToy={this.deleteToy} addLike={this.addLike}/>
      </>
    );
  }

}

export default App;
