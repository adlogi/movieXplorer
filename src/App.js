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

  setAppState = (moviesJson, keywords) => {
    this.setState({
      movies: moviesJson,
      searchKeywords: keywords
    })
  }

  render() {
    return (
      <div className="App container-fluid bg-dark">
        <div className="row d-flex justify-content-center">
          <Navbar bg="dark" variant="light">
            <Navbar.Brand href="#home">
              <img alt="" src={logo} width="200" className="d-inline-block align-top ml-4" style={{ "filter":"invert(100%)" }} />{' '}
            </Navbar.Brand>
          </Navbar>
          <SearchBox setAppState={this.setAppState} />
        </div>
        <h1 class="display-4 text-light">
          {this.state.searchKeywords === '' ? 'The Most Popular Today!' : `Results for "${this.state.searchKeywords}"`}
        </h1>
        <MovieList movies={this.state.movies} />
      </div>
    );
  }
}
