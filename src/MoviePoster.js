import React from 'react';
import MovieApi from './MovieApi';
import Card from 'react-bootstrap/Card';
import genericPoster from './film-poster-placeholder.png';
import { renderIntoDocument } from 'react-dom/test-utils';

export default class MoviePoster extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    }
  }
  onLoad = () => {
    this.setState({
      loading: false,
    })
  }
  render() {
    const posterSrc = !this.props.movie.poster_path ? genericPoster : (MovieApi.BACKDROP_BASE_URL + this.props.movie.poster_path);
    if (this.state.loading) {
      return (
        <>
          <img class="card-img-top" alt="" src={genericPoster} id={this.props.movie.id} onClick={this.props.detailsHandler} />
          <img alt="" style={{display: 'none'}} src={posterSrc} id={this.props.movie.id} onLoad={this.onLoad} />
        </>
      );
    } else {
      return <img class="card-img-top" alt="" src={posterSrc} id={this.props.movie.id} onClick={this.props.detailsHandler} />;
    }
  }
}