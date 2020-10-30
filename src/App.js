import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'


class App extends React.Component {
  constructor() {
    super()
    this.state = {
      display: false,
      allToys: []
    }
  }

  addNewToy = (newToy) => {
    console.log('new toy', newToy)
    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(newToy)
    })
      .then(res => res.json())
      .then(newToyReturn =>
        this.setState({
          allToys: [...this.state.allToys, newToyReturn]
        })
      )

  }


  componentDidMount = () => {
    fetch('http://localhost:3000/toys')
      .then(res => res.json())
      .then(toys => {
        console.log('get fetch', toys)
        this.setState({
          allToys: toys
        })
      })

  }


  deleteToy = (id) => {
    console.log('delete:', id)
    fetch(`http://localhost:3000/toys/${id}`, {
      method: 'DELETE'})
      .then(res => res.json())
      .then(this.setState({
        allToys: this.state.allToys.filter(toy => toy.id != id)
      }))
    }


  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  addLike = (toy) => {
    console.log('addLike:', toy.id)
    toy.likes = toy.likes + 1
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(toy)
    })
    .then(res => res.json())
    .then(returnedToy => {
      this.setState({
        allToys: this.state.allToys.filter( toy => toy.id === returnedToy.id ? returnedToy : toy)

    })
  })

  }

  render() {
    return (
      <>
        <Header />
        { this.state.display
          ?
          <ToyForm
            addNewToy={this.addNewToy}
          />
          :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer
          allToys={this.state.allToys}
          deleteToy={this.deleteToy}
          addLike={this.addLike}
        />
      </>
    );
  }

}

export default App;
