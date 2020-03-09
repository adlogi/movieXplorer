import React from 'react';
import MovieApi from './MovieApi';
import genericPoster from './film-poster-placeholder.png';
// import ReactImageAppear from 'react-image-appear';

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
    // return <ReactImageAppear className="card-img-top" src={posterSrc} placeholder={genericPoster} />
    
    if (this.state.loading) {
      return (
        <>
          <img className="card-img-top" alt="" src={genericPoster} id={this.props.movie.id} onClick={this.props.detailsHandler} />
          <img alt="" style={{display: 'none'}} src={posterSrc} id={this.props.movie.id} onLoad={this.onLoad} />
        </>
      );
    } else {
      return <img className="card-img-top" alt="" src={posterSrc} id={this.props.movie.id} onClick={this.props.detailsHandler} />;
    }
  }
}