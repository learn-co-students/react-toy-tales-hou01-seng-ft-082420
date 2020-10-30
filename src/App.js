import React from "react";
import "./App.css";

import Header from "./components/Header";
import ToyForm from "./components/ToyForm";
import ToyContainer from "./components/ToyContainer";

const toyUrl = "http://localhost:3000/toys/";
class App extends React.Component {
  state = {
    display: false,
    allToys: [],
  };

  handleClick = () => {
    let newBoolean = !this.state.display;
    this.setState({
      display: newBoolean,
    });
  };

  componentDidMount() {
    fetch(toyUrl)
      .then((resp) => resp.json())
      .then((toys) => this.setState({ allToys: toys }));
  }

  addNewToy = (toy) => {
    let allToys = this.state.allToys;
    this.setState({
      allToys: [...allToys, toy],
    });
    console.log(toy);
  };

  postNewToy = (toy) => {
    let postOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Accept: "application/json;charset=utf-8",
      },
      body: JSON.stringify(toy),
    };

    fetch(toyUrl, postOption)
    .then(resp => resp.json())
    .then(newToy => this.addNewToy(newToy))
  };

  frontEndDelete = (toyId) =>{
    console.log("DELETE", toyId)
    let newToys = this.state.allToys.filter(toy=> toy.id != toyId)
    this.setState({allToys: newToys})
  }
  
  backEndDelete = (toyId) => {
    let deleteOption = {
      method: "DELETE"
    }
    fetch(toyUrl+toyId, deleteOption)
    .then(this.frontEndDelete(toyId))
  }

  frontEndLikePatch = (toy) => {
    let allToys = this.state.allToys
    let thisToyIndex = allToys.indexOf(toy)
    console.log("LIKE", toy)
    ++allToys[thisToyIndex].likes
    console.log("LIKE", toy)
    let patchOption ={
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Accept': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(toy)
    }
    fetch(toyUrl+toy.id, patchOption)
    .then(this.setState({allToys: allToys}))
  }



  render() {
    return (
      <>
        <Header />
        {this.state.display ? <ToyForm postNewToy={this.postNewToy} /> : null}
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer allToys={this.state.allToys} 
          backEndDelete={this.backEndDelete}
          frontEndLikePatch={this.frontEndLikePatch}
        />
      </>
    );
  }
}

export default App;
