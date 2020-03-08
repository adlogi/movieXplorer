import React from 'react';
import CardDeck from 'react-bootstrap/CardDeck'
import MovieCard from './MovieCard';
import Placeholder from './Placeholder'

export default function MovieList(props) {
  const movieCards = [];
  const cardsCount = props.isLoading ? 10 : props.movies.length;

  for (let i = 0; i < cardsCount; i++) {
    if (props.isLoading) {
      movieCards.push(<Placeholder key={i} />);
    } else {
      movieCards.push(<MovieCard key={i} movie={props.movies[i]} detailsHandler={props.detailsHandler} />);
    }
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