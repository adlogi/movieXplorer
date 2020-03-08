import React from 'react';
import Card from 'react-bootstrap/Card';
import MoviePoster from './MoviePoster';

export default function MovieCard(props) {
  const releaseDate = !props.movie.release_date ? 'UNKNOWN' : props.movie.release_date.slice(0, 4);
  return (
    <Card className="my-3">
      <MoviePoster movie={props.movie} detailsHandler={props.detailsHandler}/>
      <Card.Body>
        <Card.Title><small>{props.movie.title}</small></Card.Title>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">{releaseDate}</small>
      </Card.Footer>
    </Card>
  );
}