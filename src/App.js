import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'


class App extends React.Component{

  state = {
    display: false,
    allToys: []
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }
componentDidMount(){
  //we want to fetch data
  fetch("http://localhost:3000/toys")
  .then(res=> res.json())
  .then(toys=>{
    this.setState({
      allToys:toys
    })
  })
}

likeToy = (toyObj) =>{
    console.log('THIS toy was clicked', toyObj.likes)
    fetch(`http://localhost:3000/toys/${toyObj.id}`,{
      method: 'PATCH',
      headers: {
        "Content-Type":"application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        likes: toyObj.likes
      })
    })
    .then(res=>res.json())
    .then(updatedToy => {
      this.setState({
        allToys: this.state.allToys.map(toy=> toy.id === updatedToy.id ? updatedToy : toy)
      })

      // this.setState({
      //   likes: updatedToy.likes
      // })
    })
}

deleteToy = (toyId) => {
  console.log("This is the toy I want to delete", toyId)

  fetch(`http://localhost:3000/toys/${toyId}`, {
    method: 'DELETE'
  })
  .then(res=> res.json())
  .then(data => {
    console.log('response from DELETE ', data)
    this.setState({
      allToys: this.state.allToys.filter(toy=> toy.id != toyId)
    })
  })
}

addToy = (newToy) => {
  console.log('Adding new toy', newToy)
  fetch('http://localhost:3000/toys',{
    method:'POST',
    headers:{
      "Content-Type":"application/json",
      "Accept": "applciation/json"
    },
    body: JSON.stringify(newToy)
  })
  .then(res=> res.json())
  .then(postedToy => {
    this.setState({
      allToys: [...this.state.allToys, postedToy]
    })
  })
}


  render(){
    return (
     <div>
        <Header/>
        { this.state.display
            ?
          <ToyForm addToy={this.addToy}/>
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer  allToys={this.state.allToys} likeToy={this.likeToy} deleteToy= {this.deleteToy}/>
   </div>
    );
  }

}

export default App;
