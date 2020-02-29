import React from 'react';
import './App.css';
import MovieList from './MovieList';
import SearchBox from './SearchBox';

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
        <div className="App-header">
          <SearchBox setAppState={this.setAppState} />
        </div>
        <MovieList movies={this.state.movies} />
      </div>
    );
  }
}
