import React from 'react';
import './App.css';
import GameBoard from 'components/GameBoard/GameBoard'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <GameBoard></GameBoard>
        </header>
      </div>
    );
  }
}

export default App;
