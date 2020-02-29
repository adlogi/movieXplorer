import React from 'react';
import './App.css';
import MovieList from './MovieList';

// function App() {
//   return (
//     <div className="App">
//       <MovieList />
//     </div>
//   );
// }

// export default App;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchKeywords: '',
    }
  }
  clickHandle = () => {
    this.setState({
      searchKeywords: document.querySelector('#search-box').value,
    })
    
  }

  render() {
    console.log(`STATE: ${this.state.searchKeywords}`)
    return (
      <div className="App">
        <div className="App-header">
          <input id="search-box" type="text" placeholder="Enter a keyword"></input>
          <button onClick={this.clickHandle}>Find</button>
          
        </div>
        <MovieList searchKeywords={this.state.searchKeywords} />
      </div>
    );
  }
}
