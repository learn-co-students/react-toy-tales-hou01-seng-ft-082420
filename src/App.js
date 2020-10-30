import React from "react";
import "./App.css";

import Header from "./components/Header";
import ToyForm from "./components/ToyForm";
import ToyContainer from "./components/ToyContainer";

const toyUrl = "http://localhost:3000/toys/";
class App extends React.Component {
  //I added an empty array as a default state for allToys to prevent any issues with passing the state down as a prop before componentDidMount
  state = {
    display: false,
    allToys: [],
  };

  //This controls displaying the form by grabbing the opposite of the current display state,and setting that as the new display state
  handleClick = () => {
    let newBoolean = !this.state.display;
    this.setState({
      display: newBoolean,
    });
  };

  //doing my fetch after component did mount and setting state to array of all toys
  componentDidMount() {
    fetch(toyUrl)
      .then((resp) => resp.json())
      .then((toys) => this.setState({ allToys: toys }));
    }
    
    //For this review I broke up the Post and the Delete into two separate functions, one for updating the front end and one for updating the back end. 
    //This allow pessimistic rendering by calling the front end render dependant on the fetch going through.

    //addNewToy is the front end representation of adding a toy to our toy collection
  addNewToy = (toy) => {
    //set a variable that is equal to the current collection
    let allToys = this.state.allToys;
    this.setState({
      //use the spreader to spread out that array, and add in the new toy
      allToys: [...allToys, toy],
    });
  };

  //backend persistence for a new toy creation
  postNewToy = (toy) => {
    //personal preference of mine to create a post option
    let postOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Accept: "application/json;charset=utf-8",
      },
      body: JSON.stringify(toy),
    };
    //fetch to our url with our option
    fetch(toyUrl, postOption)
    .then(resp => resp.json())
    //when new toy is returned, send it through our front end updating function
    .then(newToy => this.addNewToy(newToy))
  };

  //Front end non-persistent delete
  frontEndDelete = (toyId) =>{
    //Make a new array by filtering through our toy array and grabbing every toy that does *not* have the inputted toyId
    let newToys = this.state.allToys.filter(toy=> toy.id != toyId)
    //set state to our new array
    this.setState({allToys: newToys})
  }
  
  //Backend persistent delete
  backEndDelete = (toyId) => {
    let deleteOption = {
      method: "DELETE"
    }
    //Fetch to the url at the toyId, telling it to delete
    fetch(toyUrl+toyId, deleteOption)
    //then, remove it from the front end
    .then(this.frontEndDelete(toyId))
  }

  //This is a patch of likes using a kind of confusing benifit of React where props are static objects but rather pointers to existing objects
  frontEndLikePatch = (toy) => {
    //We create an array that is representing all toys
    let allToys = this.state.allToys
    //we find the index of the toy we are wanting to update
    let thisToyIndex = allToys.indexOf(toy)
    //we incriment the likes of the toy at that index
    ++allToys[thisToyIndex].likes
    //We create the patch method using the toy (which we actually altered inside this refernce, so even though we didn't alter the toy we inputted directly, we pointed to it and said alter this)
    let patchOption ={
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Accept': 'application/json;charset=utf-8'
      },
      //This commented out line of code does the same thing, even though you don't think it should
      //body: JSON.stringify(allToys[thisToyIndex])
      body: JSON.stringify(toy)
    }
    //Fetch to that toy id with the patch
    fetch(toyUrl+toy.id, patchOption)
    //update the state of allToys to the new modified array!
    .then(this.setState({allToys: allToys}))
  }


 
  render() {
    return (
      <>
        <Header />
        {/* ^^Header is just the banner, but this function below vvv is checking the state for value of display, and if true it shows the toy form
        we down the function postNewToy as a prop, since ToyForm is going to need to bubble up the toy that we are posting */}
        {this.state.display ? <ToyForm postNewToy={this.postNewToy} /> : null}
        <div className="buttonContainer">
        {/* This button is what invokes the handleClick function, toggling the display state */}
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        {/* we give our toy container our array of toys, and the function to delete and like a toy */}
        <ToyContainer allToys={this.state.allToys} 
          backEndDelete={this.backEndDelete}
          frontEndLikePatch={this.frontEndLikePatch}
        />
      </>
    );
  }
}

export default App;
