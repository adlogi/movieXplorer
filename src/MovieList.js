import React from 'react';
import movies from './data';

const BACKDROP_BASE_URL = 'http://image.tmdb.org/t/p/w780';

export default class MovieList extends React.Component {
  render() {
    return (
      <div>
        {
          movies.results.map(movie => {
            return (
              <div>
                <h2>{movie.title}</h2>
                <img src={BACKDROP_BASE_URL + movie.poster_path} alt={movie.title}></img>
              </div>
            )
          })
        }
      </div>
    );
  }
}
