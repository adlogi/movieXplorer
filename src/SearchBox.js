import React from 'react';
import 'font-awesome/css/font-awesome.min.css';

export default class SearchBox extends React.Component {

  clickHandle = () => {
    this.props.retrieveData(document.querySelector('#search-box').value);
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