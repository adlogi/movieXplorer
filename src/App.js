import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import MovieApi from './MovieApi';
import SearchBox from './components/SearchBox';
import MovieList from './components/MovieList';
import MovieModal from './components/MovieModal';
import Header from './components/Header';
import './style/App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      searchKeywords: '',
      isLoading: true,
      lastPageLoaded: 0,
      totalPages: 0,
      detailsShown: false,
      movieDetails: null,
      movieCast: null,
      movieTrailer: null,
    }
  }

  retrieveData = (searchKeywords = '', page = 1) => {
    let url;
    // replace [duplicate] whitespaces with a '+'
    searchKeywords = searchKeywords.replace(/\s+/g,'+');
    if (searchKeywords === '') {
      url = MovieApi.getMoviesListUrl(`popular`, page);
    } else {
      url = MovieApi.getSearchMoviesUrl(searchKeywords, page);
    }
    
    this.setState(prevState => {
      return {
        movies: page === 1 ? [] : prevState.movies,
        searchKeywords: searchKeywords,
        isLoading: true
      }      
    }, () => {
      fetch(url)
      .then(res => res.json())
      .then(
        data => {
          this.setState(prevState => ({
            movies: (page === 1 ? [] : prevState.movies).concat(data.results),
            isLoading: false,
            totalPages: data.total_pages,
            lastPageLoaded: page,
          }))
        }
        // ,
        // TODO: Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        // (error) => {
        //   this.setState({
        //     isLoading: false,
        //     error
        //   });
        // }
        )
    });
  }

  loadMore = () => {
    if (this.state.lastPageLoaded < this.state.totalPages) {
      this.retrieveData(this.state.searchKeywords, this.state.lastPageLoaded + 1);
    }
  }

  handleSearch = (searchKeywords) => {
    this.scrollToTop();
    this.retrieveData(searchKeywords);
  }

  scrollToTop = () => {
    window.scroll({
      top: 0, 
      left: 0, 
      behavior: 'smooth'
    });
  };

  handleScroll = () => { 
    // const cards = document.querySelectorAll('.card');
    // let lastCard = cards[cards.length - 1];
    // let lastCardOffset = lastCard.offsetTop + lastCard.clientHeight;
    // OR, instead of seeking the last card, just seek the footer:
    let footerOffset = this.footer.offsetTop + this.footer.clientHeight;
    let pageOffset = window.pageYOffset + window.innerHeight;
    if (pageOffset >= footerOffset && !this.state.isLoading) {
      this.loadMore();
    }
  };

  handleDetailsClick = (movieId) => {
    // let movieId = event.target.id;
    this.retrieveDetails(movieId);
  }

  setDetailsShow = showState => {
    this.setState({
      detailsShown: showState,
    });
  }

  fetchDetails = async (movieId) => {
    const detailsUrl = MovieApi.getMovieDetailsUrl(movieId);
    const creditsUrl = MovieApi.getMovieCreditsUrl(movieId);
    const videosUrl = MovieApi.getMovieVideosUrl(movieId);

    try {
      let [details, credits, videos] = await Promise.all([
        fetch(detailsUrl).then(res => res.json()),
        fetch(creditsUrl).then(res => res.json()),
        fetch(videosUrl).then(res => res.json())
      ]);
      return [details, credits, videos]
    }
    catch(err) {
      console.log(err);
    };
  }

  retrieveDetails = async (movieId) => {
    this.setState({
      detailsShown: true,
      movieDetails: null,
      movieCast: [],
      movieTrailer: null,
    });
    let [details, credits, videos] = await this.fetchDetails(movieId);
    this.setState({
      // detailsShown: true,
      movieDetails: details,
      movieCast: credits.cast.slice(0, 4),
      movieTrailer: videos.results[0],
    });
  }

  componentDidMount() {
    this.footer = document.querySelector('#footer');
    // this.retrieveData('');
    window.addEventListener('scroll', this.handleScroll);
  }
  
  render() {
    return (
      <Router>
        <div className="App container-fluid bg-dark h-100 mh-100">
          <div className="row d-flex justify-content-center">
            <Header />
          </div>

          <div className="row d-flex justify-content-center sticky-top" >
            <SearchBox handleSearch={this.handleSearch} />
          </div>

          <Switch>
            <Route exact path='/'>
              <h2 className="display-4 text-light">
                The <span className="font-weight-bold font-italic text-warning">Most Popular</span> Today!
              </h2>

              <MovieList movies={this.state.movies} searchKeywords={this.state.searchKeywords} detailsHandler={this.handleDetailsClick} fetchHandler={this.retrieveData} isLoading={this.state.isLoading} />
            </Route>
            <Route exact path='/search'>
              <h2 className="display-4 text-light">
                {this.state.searchKeywords === '' ? <>The <span className="font-weight-bold font-italic text-warning">Most Popular</span> Today!</> : <>Results for <span className="font-weight-bold font-italic text-warning">{this.state.searchKeywords}</span></>}
              </h2>
            </Route>
          </Switch>

          <MovieModal movieDetails={this.state.movieDetails} movieCast={this.state.movieCast} movieTrailer={this.state.movieTrailer} show={ this.state.detailsShown } onHide={ () => this.setDetailsShow(false) } />

          {(this.state.lastPageLoaded < this.state.totalPages) ?
          (<button type="button" className="btn btn-dark border border-white" onClick={this.loadMore} >Load more...</button>) : ''}
          <footer id="footer" className="p-4"></footer>
        </div>
      </Router>
    );
  }
  
}
