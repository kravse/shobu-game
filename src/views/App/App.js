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
        <GameBoard></GameBoard>
      </div>
    );
  }
}

export default App;
