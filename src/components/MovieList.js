import React from 'react';
import CardDeck from 'react-bootstrap/CardDeck'
import MovieCard from './MovieCard';
import Placeholder from './Placeholder'

export default class MovieList extends React.Component {
  constructor(props) {
    super(props);
    this.movieCards = [];
  }
  
  insertRowBreak = index => {
    // Controling the number of cards per row (responsive)
    // Credit: https://www.codeply.com/go/nIB6oSbv6q
    // wrap every 2 on sm
    if ((index + 1) % 2 === 0) this.movieCards.push(<div key={`${index}.2`} className="w-100 d-none d-sm-block d-md-none"></div>);
    // wrap every 3 on md
    if ((index + 1) % 3 === 0) this.movieCards.push(<div key={`${index}.3`} className="w-100 d-none d-md-block d-lg-none"></div>);
    // wrap every 4 on lg
    if ((index + 1) % 4 === 0) this.movieCards.push(<div key={`${index}.4`} className="w-100 d-none d-lg-block d-xl-none"></div>);
    // wrap every 5 on xl
    if ((index + 1) % 5 === 0) this.movieCards.push(<div key={`${index}.5`} className="w-100 d-none d-xl-block"></div>);
  }

  render() {
    console.log(`RENDERING MOVIE LIST\n`)
    let i = 0;
    for (; i < this.props.movies.length; i++) {
      this.movieCards.push(<MovieCard key={i} movie={this.props.movies[i]} detailsHandler={this.props.detailsHandler} />);
      this.insertRowBreak(i);
    }
    if (this.props.isLoading) {
      for (; i < this.props.movies.length + 10; i++) {
        this.movieCards.push(<Placeholder key={i} />);
        this.insertRowBreak(i);
      }
    }
    return <CardDeck className="m-4 pb-5">{ this.movieCards }</CardDeck>;
  }

  componentDidMount() {
    this.props.fetchHandler();
  }
}