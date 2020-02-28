import React from 'react';

export default class MovieList extends React.Component {
  static TMDB_BASE_URL = 'https://api.themoviedb.org/3';
  static BACKDROP_BASE_URL = 'http://image.tmdb.org/t/p/w780';
  static API_KEY = '542003918769df50083a13c415bbc602';
  

  static  _constructUrl(path) {
    return `${MovieList.TMDB_BASE_URL}/${path}?api_key=${MovieList.API_KEY}`;
  }

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      movies: []
    };
  }

  componentDidMount() {
    // Fetch data from TMDB website directly:
    // const url = MovieList._constructUrl(`movie/now_playing`);
    // Fetch data from a local file in /public:
    const url = './movies.json';
    console.log(url);
    fetch(url)
      .then(res => res.json())
      .then(
        (data) => {
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
      )
  }

  render() {
    const { error, isLoaded, movies } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading Movies...</div>;
    } else {
      return (
        <div>
        {
          movies.map(movie => {
            return (
              <div key={movie.id}>
                <h2>{movie.title} <small>({movie.release_date.slice(0, 4)})</small></h2>
                <img src={MovieList.BACKDROP_BASE_URL + movie.poster_path} alt={movie.title} width="200"></img>
              </div>
            )
          })
        }
        </div>
      );
    }
  }
}
