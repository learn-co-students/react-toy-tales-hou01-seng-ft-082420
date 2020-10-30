import React from 'react';
import './App.css';

import Header from './components/Header';
import ToyForm from './components/ToyForm';
import ToyContainer from './components/ToyContainer';
const toysUrl = 'http://localhost:3000/toys/';

class App extends React.Component {
	state = {
		display: false,
		toys: [],
	};

	componentDidMount() {
		fetch(toysUrl)
			.then(res => res.json())
			.then(toys => this.setState({ toys }));
	}

	handleClick = () => {
		let newBoolean = !this.state.display;
		this.setState({
			display: newBoolean,
		});
	};

	handleLike = toy => {
		++toy.likes;
		fetch(toysUrl + `${toy.id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify(toy),
		})
			.then(res => res.json())
			.then(patchedToy => {
				let toys = this.state.toys.map(toy => {
					return toy.id === patchedToy.id ? patchedToy : toy;
				});
				this.setState({ toys });
			});
	};

	handleDonate = toy => {
    fetch(toysUrl + `${toy.id}`, { method: 'DELETE'})
    .then(() => {
      this.setState({
        toys: this.state.toys.filter(t => {
          return t.id !== toy.id
        })
      })
    })
  };

  addNewToy = toy => {
    fetch(toysUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(toy)
    })
    .then(res => res.json())
    .then(newToy => {
      let toys = [...this.state.toys, newToy]
      this.setState({toys})
      this.handleClick()
    })
  }

	render() {
		return (
			<>
				<Header />
				{this.state.display ? <ToyForm addNewToy = {this.addNewToy} /> : null}
				<div className='buttonContainer'>
					<button onClick={this.handleClick}> Add a Toy </button>
				</div>
				<ToyContainer
					toys={this.state.toys}
					handleLike={this.handleLike}
					handleDonate={this.handleDonate}
				/>
			</>
		);
	}
}

export default App;
