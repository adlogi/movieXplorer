import React from 'react';
import CardDeck from 'react-bootstrap/CardDeck';
import Card from 'react-bootstrap/Card';
import genericPoster from './film-poster-placeholder.png'

export default class MovieList extends React.Component {
  static BACKDROP_BASE_URL = 'http://image.tmdb.org/t/p/w780';
  
  generateMovieCardDeck(movies) {
    let movieCards = [];

    for (let i = 0; i < movies.length; i++) {
      let posterSrc = movies[i].poster_path === null ? genericPoster : (MovieList.BACKDROP_BASE_URL + movies[i].poster_path);
      let releaseDate = movies[i].release_date === undefined ? 'UNKNOWN' : movies[i].release_date.slice(0, 4);
      movieCards.push(
        // <Card key={movies[i].id} className="mt-3">
        <Card key={i} className="mt-3">
          <Card.Img variant="top" src={posterSrc} />
          <Card.Body>
            <Card.Title>{movies[i].title}</Card.Title>
            <Card.Text>
                Rating: {movies[i].vote_average} / 10 <br />
                <small className="text-muted">(Based on {movies[i].vote_count} votes)</small>
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">({releaseDate})</small>
          </Card.Footer>
        </Card>
      );
      // Controling the number of cards per row (responsive)
      // Credit: https://www.codeply.com/go/nIB6oSbv6q
      // wrap every 2 on sm
      if ((i + 1) % 2 === 0) movieCards.push(<div key={`${i}.2`} className="w-100 d-none d-sm-block d-md-none"></div>);
      // wrap every 3 on md
      if ((i + 1) % 3 === 0) movieCards.push(<div key={`${i}.3`} className="w-100 d-none d-md-block d-lg-none"></div>);
      // wrap every 4 on lg
      if ((i + 1) % 4 === 0) movieCards.push(<div key={`${i}.4`} className="w-100 d-none d-lg-block d-xl-none"></div>);
      // wrap every 5 on xl
      if ((i + 1) % 5 === 0) movieCards.push(<div key={`${i}.5`} className="w-100 d-none d-xl-block"></div>);
    }
    return <CardDeck className="m-4 pb-5">{ movieCards }</CardDeck>;
  }

  render() {
    return this.generateMovieCardDeck(this.props.movies);
  }
}
