import React from 'react';
import CardDeck from 'react-bootstrap/CardDeck';
import Card from 'react-bootstrap/Card';

export default class MovieList extends React.Component {
  static BACKDROP_BASE_URL = 'http://image.tmdb.org/t/p/w780';

  
  generateMovieCardDeck(movies) {
    let movieCards = [];

    for (let i = 0; i < movies.length; i++) {
      movieCards.push(
        <Card key={movies[i].id} className="mt-3">
          <Card.Img variant="top" src={MovieList.BACKDROP_BASE_URL + movies[i].poster_path} />
          <Card.Body>
            <Card.Title>{movies[i].title}</Card.Title>
            <Card.Text>Rating: {movies[i].vote_average} / 10</Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">({movies[i].release_date.slice(0, 4)})</small>
          </Card.Footer>
        </Card>
      );
      // wrap every 2 on sm
      if ((i + 1) % 2 === 0) movieCards.push(<div class="w-100 d-none d-sm-block d-md-none"></div>);
      // wrap every 3 on md
      if ((i + 1) % 3 === 0) movieCards.push(<div class="w-100 d-none d-md-block d-lg-none"></div>);
      // wrap every 4 on lg
      if ((i + 1) % 4 === 0) movieCards.push(<div class="w-100 d-none d-lg-block d-xl-none"></div>);
      // wrap every 5 on xl
      if ((i + 1) % 5 === 0) movieCards.push(<div class="w-100 d-none d-xl-block"></div>);
      // Credit: https://www.codeply.com/go/nIB6oSbv6q
    }
    return <CardDeck>{ movieCards }</CardDeck>;
  }

  render() {
    return this.generateMovieCardDeck(this.props.movies);
  }
}
