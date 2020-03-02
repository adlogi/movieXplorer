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
      lastPageLoaded: 0,
      totalPages: 0,
    }
  }

  constructDefaultUrl(param, page = 1) {
    return `${App.TMDB_BASE_URL}/movie/${param}?api_key=${App.API_KEY}&language=en-US&page=${page}`;
  }

  constructSearchUrl(keywords, page = 1) {
    return `${App.TMDB_BASE_URL}/search/movie?api_key=${App.API_KEY}&language=en-US&query=${keywords}&page=${page}&include_adult=false`;
  }

  retrieveData = (searchKeywords, page = 1) => {
    let url;
    if (searchKeywords === '') {
      url = this.constructDefaultUrl(`popular`, page);
    } else {
      url = this.constructSearchUrl(searchKeywords, page);
    }
    
    fetch(url)
    .then(res => res.json())
    .then(
      data => {
        this.setState(prevState => ({
          movies: (page === 1 ? [] : prevState.movies).concat(data.results),
          searchKeywords: searchKeywords,
          totalPages: data.total_pages,
          lastPageLoaded: page,
        }))
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

  loadMore = () => {
    if (this.state.lastPageLoaded < this.state.totalPages) {
      this.retrieveData(this.state.searchKeywords, this.state.lastPageLoaded + 1);
    }
  }

  handleSearch = (searchKeywords) => {
    this.retrieveData(searchKeywords);
    // window.scrollTo(0, 0);
    this.scrollToTop();
  }

  scrollToTop = () => {
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 0) {
      window.requestAnimationFrame(this.scrollToTop);
      window.scrollTo(0, c - c / 10);
    }
  };

  handleScroll = () => { 
    let lastCard = document.querySelector('div.card-deck > div:last-child');
    let lastCardOffset = lastCard.offsetTop + lastCard.clientHeight;
    let pageOffset = window.pageYOffset + window.innerHeight;
    if (pageOffset > lastCardOffset) {
      this.loadMore();
    }
  };

  render() {
    return (
      <div className="App container-fluid bg-dark">
        <div className="row d-flex justify-content-center">
          <Navbar bg="dark" variant="light">
            <Navbar.Brand href="#home">
              <img alt="" src={logo} width="200" className="d-inline-block align-top ml-4" style={{ "filter":"invert(100%)" }} />{' '}
            </Navbar.Brand>
          </Navbar>
        </div>
        <div className="row d-flex justify-content-center sticky-top" >
          <SearchBox handleSearch={this.handleSearch} />
        </div>
        <h1 className="display-4 text-light">
          {this.state.searchKeywords === '' ? 'The Most Popular Today!' : `Results for "${this.state.searchKeywords}"`}
        </h1>
        <MovieList movies={this.state.movies} />
        {(this.state.lastPageLoaded < this.state.totalPages)?
        (<button type="button" className="btn btn-light" onClick={this.loadMore} >Load more...</button>):''}
        <footer className="p-4"></footer>
      </div>
    );
  }

  componentDidMount() {
    this.retrieveData('');
    window.addEventListener('scroll', this.handleScroll);
  }
  
}
