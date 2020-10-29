import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'


class App extends React.Component{

  constructor(){
    super()
    this.state = {
    display: false,
    toys: []
    }
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  componentDidMount(){
    fetch('http://localhost:3000/toys')
    .then(res=>res.json())
    .then(toys => {
      console.log(toys)
      this.setState({
        toys
      })
    })
  }

  addNewToy = (e) => {
    e.preventDefault()
    // console.log(e.target[0].value, e.target[1].value)
    let newToy = {
      name: e.target[0].value,
      image: e.target[1].value,
      likes: 0
    }
    console.log(newToy)
    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(newToy)
    })
    .then(res=>res.json())
    .then(toyObj => {
      this.setState({
        toys: [...this.state.toys, toyObj],
        display: !this.state.display
      })
    })
  }

  deleteToy = (id) => {
    console.log("imagine a delete", id)
    fetch(`http://localhost:3000/toys/${id}`, {
      method: 'DELETE'
    })
    .then(res=> res.json())
    .then(() => {
      this.setState({
        toys: this.state.toys.filter(toy => toy.id !== id)
      })
    })
  }

  addLike = (toy) => {
    console.log('A like?! How flattering', toy)
    let newLikes = parseInt(toy.likes) + 1
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        likes: newLikes
      })
    })
    .then(res => res.json())
    .then(toyUpdate => {
      this.setState({
        toys: this.state.toys.map(toy => toy.id === toyUpdate.id ? toyUpdate : toy)
      })
    })

  }

  render(){
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm addNewToy = {this.addNewToy}/>
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer 
        toys = {this.state.toys}
        deleteToy = {this.deleteToy}
        addLike = {this.addLike}
        />
      </>
    );
  }

}

export default App;
