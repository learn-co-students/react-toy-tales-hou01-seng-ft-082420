import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'


class App extends React.Component{

  constructor() {
    super()

    this.state = {
    display: false,
    allToys: []
    }
  }
  
  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  addNewToy = (toyObj) => {

    let toyOptions = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(toyObj)
    }

    fetch('http://localhost:3000/toys', toyOptions)
    .then(res => res.json())
    .then(newToy => {
      this.setState({
        allToys: [...this.state.allToys, newToy]
      })
    })

  }

  likeToy = (toyObj) => {
    console.log('this is my liked toy', toyObj)
    toyObj.likes = toyObj.likes + 1
    let toyOptions = {
      method:"PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(toyObj)
    }
    fetch(`http://localhost:3000/toys/${toyObj.id}`, toyOptions)
    .then(res => res.json())
    .then(likedToy => {
      console.log('this is the likedToy', likedToy)
      this.setState({
        allToys: this.state.allToys.filter(toy => toy.id === likedToy.id ? likedToy : toy)
      })
    })
  }

  deleteToy = (toyObj) => {
    let toyOptions = {
      method: "DELETE"
    }
    fetch(`http://localhost:3000/toys/${toyObj.id}`, toyOptions)
    .then(res => res.json())
    .then(toyData => {
      this.setState({
        allToys: this.state.allToys.filter( toy => toy.id !== toyObj.id)
      })
    })
  }

  componentDidMount = () => {
    fetch('http://localhost:3000/toys')
    .then(res => res.json())
    .then(toys => {
      console.log('server GET response', toys)
      this.setState({
        allToys: toys
      })
    })
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
        <ToyContainer toys={this.state.allToys} likeToy={this.likeToy} deleteToy={this.deleteToy} />
      </>
    );
  }

}

export default App;
