import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'

class App extends React.Component{
  
  state = {
    //set a default state value for array of toys
    toys: [],
    display: false
  }

  componentDidMount() {
    let toyURL = 'http://localhost:3000/toys'

    fetch(toyURL).then(response => response.json())
    .then(toys => {
      this.setState({
        toys
      })
    })
  }

  addNewToy = (toyForm) => {
    // console.log(toyForm.name.value, toyForm.image.value)
    let toyURL = 'http://localhost:3000/toys'
    let name = toyForm.name.value
    let image = toyForm.image.value
    
    let postOption = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'applicaiton/json',
      },
      body: JSON.stringify({
        name,
        image,
        likes: 0
      })
    }

    fetch(toyURL, postOption).then(repsonse => repsonse.json())
    .then(toy => {
      this.setState({
        toys: [...this.state.toys, toy]
      })
    })
  }

  deleteToy = (toyID) => {
    let toyURL = 'http://localhost:3000/toys'
    let id = toyID
    
    let deleteOption = {
      method: "DELETE"
    }

    fetch(`${toyURL}/${id}`, deleteOption).then(response => response.json())
    .then(toy => {
      this.setState({
        //filter through all toys and include each toy instance in the new array that does 
        //NOT have the same id as the one just deleted
        toys: this.state.toys.filter(toy => toy.id != id)
      })
    })
  }

  updateLikes = (toyID, toyLikes) => {
    // console.log(toyID, toyLikes)
    let toyURL = 'http://localhost:3000/toys'

    let patchOption = {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'applicaiton/json',
      },
      body: JSON.stringify({
        likes: toyLikes + 1
      })
    }

    fetch(`${toyURL}/${toyID}`, patchOption).then(response => response.json())
    .then(newToy => {
      //iterate through using map using ternary
      //if toy id == new id, newToy : oldToy
      this.setState({
        //iterate through and test each instance of toy for its id and it matches the id of 
        //the updated toy (newToy that came from .then)
        //and if it does, include newToy, which is updated with the new likes, in the mapped array
        // if the id's dont match, include the unaltered toy instance
        toys: this.state.toys.map(toy => toy.id === newToy.id ? newToy : toy)
      })
    })

  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
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
        <ToyContainer toys={this.state.toys} deleteToy={this.deleteToy} updateLikes={this.updateLikes}/>
      </>
    );
  }

}

export default App;

// Hierarchy:
// App > Header
// App > ToyForm
// App > ToyContainer
// ToyContainer > ToyCard
