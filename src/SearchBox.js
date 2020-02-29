import React from 'react';
import 'font-awesome/css/font-awesome.min.css';

export default class SearchBox extends React.Component {
  static TMDB_BASE_URL = 'https://api.themoviedb.org/3';
  static API_KEY = '542003918769df50083a13c415bbc602';

  static  _constructDefaultUrl(path) {
    return `${SearchBox.TMDB_BASE_URL}/${path}?api_key=${SearchBox.API_KEY}`;
  }

  static  _constructSearchUrl(keywords) {
    return `${SearchBox.TMDB_BASE_URL}/search/movie?api_key=${SearchBox.API_KEY}&language=en-US&query=${keywords}&page=1&include_adult=false`;
  }

  retrieveData(searchKeywords) {
    let url;
    if (searchKeywords === '') {
      url = SearchBox._constructDefaultUrl(`movie/popular`);
    } else {
      url = SearchBox._constructSearchUrl(searchKeywords)
    }
    
    fetch(url)
    .then(res => res.json())
    .then(
      data => {
        this.props.setAppState(data.results, searchKeywords);
      }
      // ,
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      // (error) => {
      //   this.props.setAppState({
      //     isLoaded: true,
      //     error
      //   });
      // }
    );
  }

  componentDidMount() {
    this.retrieveData('');
  }

  clickHandle = () => {
    this.retrieveData(document.querySelector('#search-box').value);
  }

  enterHandle = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.querySelector('#button-addon2').click();
    }
  }

  render() {
    return (
      <div className="p-2 bg-light rounded rounded-pill shadow-sm m-5 w-75">
        <div className="input-group">
          <div className="input-group-prepend">
            <button onClick={this.clickHandle} id="button-addon2" type="submit" className="btn btn-link text-dark"><i className="fa fa-search"></i></button>
          </div>
          <input id="search-box" type="search" placeholder="What're you searching for?" aria-describedby="button-addon2" className="form-control border-0 bg-light" onKeyUp={this.enterHandle} />
        </div>
      </div>
    );
  }
}