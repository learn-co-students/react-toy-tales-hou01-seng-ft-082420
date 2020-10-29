import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'
import ToyCard from './components/ToyCard'


class App extends React.Component {

  constructor() {
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

  fetchToys = () => {
    fetch("http://localhost:3000/toys")
      .then(res => res.json())
      .then(toyList => this.renderToyCards(toyList))
  }


  componentDidMount() {
    this.fetchToys()
  }

  renderToyCards = (toyList) => {
    let componentArray = toyList.map(toy => <ToyCard
      addLike={this.addLike} 
      deleteToy={this.deleteToy} 
      toy={toy} />)
    this.setState({ toys: componentArray })
  }

  addToy = (toy) => {
    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "name": toy.name,
        "image": toy.image,
        "likes": 0
      })
    })
    .then(this.fetchToys())
  }

  deleteToy = (id) => {
    fetch(`http://localhost:3000/toys/${id}`, {
      method: "DELETE"
    })
    .then(this.fetchToys())
  }

  addLike = (likes, id) => {
    const newLikes = likes += 1
    fetch(`http://localhost:3000/toys/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "likes": newLikes
      })
    })
    .then(this.fetchToys())
  }

  render() {
    return (
      <>
        <Header />
        { this.state.display
          ?
          <ToyForm addToy={this.addToy}/>
          :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toys={this.state.toys}/>
      </>
    );
  }

}

export default App;
