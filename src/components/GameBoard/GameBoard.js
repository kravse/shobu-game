import React from 'react';
import './GameBoard.css';
import SingleBoard from 'components/SingleBoard/SingleBoard'

class GameBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Squares: [Array(16).fill(null), Array(16).fill(null), Array(16).fill(null), Array(16).fill(null)]
    };
  }

  handleClick(board, i) {
    let newBoardState = this.state.Squares
    newBoardState[board][i] = 'clicked'
    this.setState({
      Squares: newBoardState
    })
  }

  render() {
    return (
      <div className="game-board">
        <div className="game-board-row">
          <SingleBoard onClick={(i) => this.handleClick(0, i)} squares={this.state.Squares[0]}></SingleBoard>
          <SingleBoard onClick={(i) => this.handleClick(1, i)} squares={this.state.Squares[1]}></SingleBoard>
        </div>
        <div className="game-board-row">
          <SingleBoard onClick={(i) => this.handleClick(2, i)} squares={this.state.Squares[2]}></SingleBoard>
          <SingleBoard onClick={(i) => this.handleClick(3, i)} squares={this.state.Squares[3]}></SingleBoard>
        </div>
      </div>
    );
  }
}

export default GameBoard;
