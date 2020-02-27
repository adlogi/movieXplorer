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
  render() {
    return (
      <div className="App">
        <MovieList />
      </div>
    );
  }
}
