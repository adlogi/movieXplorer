import React from 'react';

export default class MovieList extends React.Component {
  static BACKDROP_BASE_URL = 'http://image.tmdb.org/t/p/w780';

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
    return this.generateMovieList(this.props.movies);
  }
}
