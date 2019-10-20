import React from 'react';
import './GameBoard.css';
import SingleBoard from 'components/SingleBoard/SingleBoard'

class GameBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      turnVal: 1,
      selected: {
        start: { board: null, square: null },
        finish: { board: null, square: null }
      },
      squares: [
        [ 1, 1, 1, 1, null, null, null, null, null, null, null, null, 0, 0, 0, 0],
        [ 1, 1, 1, 1, null, null, null, null, null, null, null, null, 0, 0, 0, 0],
        [ 1, 1, 1, 1, null, null, null, null, null, null, null, null, 0, 0, 0, 0],
        [ 1, 1, 1, 1, null, null, null, null, null, null, null, null, 0, 0, 0, 0]
      ]
    };
  }

  getCoords(i) {
    return [i % 4, Math.floor(i / 4)];
  }

  isValidSelection(current, next) {
    let valid = true;
    let currentCoords = this.getCoords(current);
    let nextCoords = this.getCoords(next);

    let currentDist = Math.abs(currentCoords[0] - nextCoords[0]);
    let nextDist = Math.abs(currentCoords[1] - nextCoords[1]);
    console.log(currentCoords, currentDist, nextCoords, nextDist)

    if (currentDist > 2 ||
      nextDist > 2) {
        valid = false;
    }
    if (currentDist === 1 &&
      nextDist > 1) {
      valid = false;
    }
    if (currentDist === 2 &&
      nextDist < 2) {
      valid = false;
    }

    return valid;
  }

  canSelect(board, square) {
    let clickedCoordsVal = this.state.squares[board][square]
    if (clickedCoordsVal === this.state.turnVal) {
      return 'start'
    } else if (!this.state.selected.finish.board &&
      this.state.selected.start.board === board &&
      clickedCoordsVal === null &&
      this.isValidSelection(this.state.selected.start.square, square)) {
      return 'finish'
    }
    return ''
  }

  handleClick(board, square) {
    let newSelection = this.canSelect(board, square)
    if (newSelection) {
      let newSelectedState = this.state.selected
      newSelectedState[newSelection] = { board: board, square: square }
      if (newSelection === 'start') newSelectedState.finish = { board: null, square: null }
      this.setState({ selected: newSelectedState});
    }
    // let newBoardState = this.state.Squares
    // newBoardState[board][square] = ''
    // this.setState({
    //   squares: newBoardState
    // })
  }

  currentSelections(board) {
    let selections = []
    if (board === this.state.selected.start.board) {
      selections.push(this.state.selected.start.square)
    }
    if (board === this.state.selected.finish.board) {
      selections.push(this.state.selected.finish.square)
    }
    return selections
  }

  render() {
    return (
      <div className="game-board">
        <div className="game-board-row">
          <SingleBoard
            onClick={(i) => this.handleClick(0, i)}
            selections={this.currentSelections(0)}
            squares={this.state.squares[0]}></SingleBoard>
          <SingleBoard
            onClick={(i) => this.handleClick(1, i)}
            selections={this.currentSelections(1)}
            squares={this.state.squares[1]}></SingleBoard>
        </div>
        <div className="game-board-row">
          <SingleBoard
            onClick={(i) => this.handleClick(2, i)}
            selections={this.currentSelections(2)}
            squares={this.state.squares[2]}></SingleBoard>
          <SingleBoard
            onClick={(i) => this.handleClick(3, i)}
            selections={this.currentSelections(3)}
            squares={this.state.squares[3]}></SingleBoard>
        </div>
      </div>
    );
  }
}

export default GameBoard;
