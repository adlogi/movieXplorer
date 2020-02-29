import React from 'react';

export default class MovieList extends React.Component {
  static TMDB_BASE_URL = 'https://api.themoviedb.org/3';
  static BACKDROP_BASE_URL = 'http://image.tmdb.org/t/p/w780';
  static API_KEY = '542003918769df50083a13c415bbc602';
  

  static  _constructDefaultUrl(path) {
    return `${MovieList.TMDB_BASE_URL}/${path}?api_key=${MovieList.API_KEY}`;
  }

  static  _constructSearchUrl(keywords) {
    return `${MovieList.TMDB_BASE_URL}/search/movie?api_key=${MovieList.API_KEY}&language=en-US&query=${keywords}&page=1&include_adult=false`;
  }

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      movies: []
    };
  }

  retrieveData() {
    let url;
    if (this.props.searchKeywords === '') {
      // url = './movies.json';
      url = MovieList._constructDefaultUrl(`movie/now_playing`);
    } else {
      url = MovieList._constructSearchUrl(this.props.searchKeywords)
    }
    
    fetch(url)
    .then(res => res.json())
    .then(
      data => {
        console.log(`Update: ${data.results}`)
        this.setState({
          isLoaded: true,
          movies: data.results
        });
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    );
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (this.props.searchKeywords !== nextProps.searchKeywords) return true;
  //   return false;
  // }

  componentDidMount() {
    this.retrieveData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.searchKeywords !== prevProps.searchKeywords) {
      this.retrieveData();
    }
  }

  generateMovieList(movies) {
    return (
      <div>
      {
        movies.map(movie =>
            <div key={movie.id}>
              <h2>{movie.title} <small>({movie.release_date.slice(0, 4)})</small></h2>
              <img src={MovieList.BACKDROP_BASE_URL + movie.poster_path} alt={movie.title} width="200"></img>
            </div>
          )
      }
      </div>
    );
  }

  render() {
    const { error, isLoaded, movies } = this.state;

    if (error) return <div>Error: {error.message}</div>;
    if (!isLoaded) return <div>Loading Movies...</div>;
    return this.generateMovieList(movies);
  }
}
