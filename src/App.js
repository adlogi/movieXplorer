import React from 'react';
import './App.css';
import MovieList from './MovieList';
import SearchBox from './SearchBox';
import Navbar from 'react-bootstrap/Navbar';
import logo from './logo.png'

export default class App extends React.Component {
  static TMDB_BASE_URL = 'https://api.themoviedb.org/3';
  static API_KEY = '542003918769df50083a13c415bbc602'; 

  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      searchKeywords: '',
    }
  }

  constructDefaultUrl(path) {
    return `${App.TMDB_BASE_URL}/${path}?api_key=${App.API_KEY}`;
  }

  constructSearchUrl(keywords) {
    return `${App.TMDB_BASE_URL}/search/movie?api_key=${App.API_KEY}&language=en-US&query=${keywords}&page=1&include_adult=false`;
  }

  retrieveData = (searchKeywords) => {
    let url;
    if (searchKeywords === '') {
      url = this.constructDefaultUrl(`movie/popular`);
    } else {
      url = this.constructSearchUrl(searchKeywords);
    }
    
    fetch(url)
    .then(res => res.json())
    .then(
      data => {
        this.setState({
          movies: data.results,
          searchKeywords: searchKeywords,
        })
      }
      // ,
      // TODO: Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      // (error) => {
      //   this.setState({
      //     isLoaded: true,
      //     error
      //   });
      // }
    );
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
          <SearchBox retrieveData={this.retrieveData} />
        </div>

        <h1 className="display-4 text-light">
          {this.state.searchKeywords === '' ? 'The Most Popular Today!' : `Results for "${this.state.searchKeywords}"`}
        </h1>
        <MovieList movies={this.state.movies} />
        <footer className="p-1"></footer>
      </div>
    );
  }

  componentDidMount() {
    this.retrieveData('');
    setTimeout(this.showState, 2000);
  }

  showState = () => {
    console.log(`Movies: ${this.state.movies}`);
  }
}
