import React from 'react';
// import movies from './data';

export default class MovieList extends React.Component {
  static BACKDROP_BASE_URL = 'http://image.tmdb.org/t/p/w780';
  static TMDB_BASE_URL = 'https://api.themoviedb.org/3';

  static  _constructUrl(path) {
    return `${MovieList.TMDB_BASE_URL}/${path}?api_key=542003918769df50083a13c415bbc602`;
  }

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    const url = MovieList._constructUrl(`movie/now_playing`);
    console.log(url);
    fetch(url)
      .then(res => res.json())
      .then(
        (data) => {
          this.setState({
            isLoaded: true,
            items: data.results
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
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading Movies...</div>;
    } else {
      return (
        <div>
        {
          items.map(movie => {
            return (
              <div>
                <h2>{movie.title}</h2>
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
