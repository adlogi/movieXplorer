import React from 'react';
import 'font-awesome/css/font-awesome.min.css';

export default function SearchBox(props) {
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
    <div className="bg-dark border border-white rounded rounded-pill shadow-sm m-5 p-2 w-75">
      <div className="input-group">
        <div className="input-group-prepend">
        <button onClick={handleSearch} id="button-addon2" type="submit" className="btn btn-link text-light"><i className="fa fa-search"></i></button>
        </div>
        <input id="search-box" type="search" placeholder="What are you searching for?" aria-describedby="button-addon2" className="form-control border-0 bg-secondary text-warning mr-2" onKeyUp={handleEnter} onFocus={handleSearchFocus} />
      </div>
    </div>
  );
}