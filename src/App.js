import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'


class App extends React.Component{

  state = {
    display: false,
    toys: []
  }
  componentDidMount(){
    fetch("http://localhost:3000/toys").then(res=>res.json()).then(dbToys => this.setState({toys: dbToys}))
  }

  handleLike = (choosenToy) => {
    ++choosenToy.likes
    fetch(`http://localhost:3000/toys/${choosenToy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type":"application/json",
        "Accept": "application/json"
      },
      body:JSON.stringify(choosenToy)
    }).then(res=>res.json()).then(choosenToy=>{
      this.setState({
        toys: this.state.toys.map((toy) => toy.id === choosenToy.id ? choosenToy : toy)
      })
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const newName = e.target.name.value
    const newPic = e.target.image.value
    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type":"application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: newName,
        image: newPic,
        likes: 0
      })
    }).then(res=>res.json()).then(newToy =>{
      this.setState({toys: [...this.state.toys, newToy]})
    })
    this.handleClick()
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  handleGoodbye = (choosenToy) => {
    console.log("Bye MFs")
    fetch(`http://localhost:3000/toys/${choosenToy.id}`,{
      method: "DELETE"
    }).then(this.setState({toys: this.state.toys.filter((toy) => toy.id != choosenToy.id)}))
  }

  render(){
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm newToy={this.handleSubmit}/>
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toys={this.state.toys} like={this.handleLike} bye={this.handleGoodbye}/>
      </>
    );
  }

}

export default App;
