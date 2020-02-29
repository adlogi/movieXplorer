import React from 'react';
import './App.css';
import MovieList from './MovieList';
import SearchBox from './SearchBox';
import Navbar from 'react-bootstrap/Navbar';
import logo from './logo.png'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: []
    }
  }

  setAppState = (moviesJson) => {
    this.setState({
      movies: moviesJson
    })
  }

  render() {
    console.log(`App(MOVIES): ${this.state.movies}`)
    return (
      <div className="App">
        <Navbar bg="light" variant="light">
          <Navbar.Brand href="#home">
            <img
              alt=""
              src={logo}
              width="100"
              // height="30"
              className="d-inline-block align-top"
            />{' '}
          </Navbar.Brand>
        </Navbar>
        {/* <div className="App-header"> */}
        <div>
          <SearchBox setAppState={this.setAppState} />
        </div>
        <MovieList movies={this.state.movies} />
      </div>
    );
  }
}
