import React from "react";
import "./App.css";

import Header from "./components/Header";
import ToyForm from "./components/ToyForm";
import ToyContainer from "./components/ToyContainer";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      allToys: [],
      display: false,
    };
  }

  componentDidMount() {
    fetch("http://localhost:3000/toys") //endpoint to get data
      .then((res) => res.json()) //parsing our response to JSON
      .then((toys) => {
        this.setState({
          allToys: toys,
        });
        // console.log(toys);
      }); //data available, to insert into state
  }

  addNewToy = (newToy) => {
    // console.log("Submit event in App")
    // console.log(newToy);

    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(newToy)
    })
      .then((res) => res.json())
      .then((toyObj) => {
        console.log("response from server", toyObj);
        this.setState({
          allToys: [...this.state.allToys, toyObj],
        });
      });
  };

  deleteToy = (id) => {
    console.log("deleting this toy, bruh", id);

    fetch(`http://localhost:3000/toys/${id}`, {
      method: "DELETE"
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          allToys: this.state.allToys.filter((toy) => toy.id !== id)
        }) 
      })
  }

  updateLikes = (chosenToy) => {
    // ++chosenToy.likes
    // console.log(chosenToy.likes)
    fetch(`http://localhost:3000/toys/${chosenToy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "likes": ++chosenToy.likes
      })
    })
      .then(res => res.json())
      .then(updatedToy => this.setState({ 
        likes: updatedToy.likes
      }))
  }
 
  handleClick = () => {
    let newBoolean = !this.state.display;
    this.setState({
      display: newBoolean,
    });
  };
  render() {
    // console.log(this.state.allToys)
    return (
      <>
        <Header />
        {this.state.display ? <ToyForm addNewToy={this.addNewToy}/> : null }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer 
        toyCollection = {this.state.allToys}
        deleteToy = {this.deleteToy}
        updateLikes = {this.updateLikes}
        />
      </>
    );
  }
}

export default App;

