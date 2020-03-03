import React from 'react';
import 'font-awesome/css/font-awesome.min.css';

const SearchBox = (props) => {
  const handleSearch = () => {
    const searchBox = document.querySelector('#search-box');
    searchBox.blur();
    props.handleSearch(searchBox.value);
  }

  const handleSearchFocus = (event) => {
    event.target.value = '';
  }

  const handleEnter = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.querySelector('#button-addon2').click();
    }
  }

  return (
    <div className="bg-light rounded rounded-pill shadow-sm m-5 p-2 w-75">
      <div className="input-group">
        <div className="input-group-prepend">
          <button onClick={handleSearch} id="button-addon2" type="submit" className="btn btn-link text-dark"><i className="fa fa-search"></i></button>
        </div>
        <input id="search-box" type="search" placeholder="What're you searching for?" aria-describedby="button-addon2" className="form-control border-0 bg-light" onKeyUp={handleEnter} onFocus={handleSearchFocus} />
      </div>
    </div>
  );
}

export default SearchBox;