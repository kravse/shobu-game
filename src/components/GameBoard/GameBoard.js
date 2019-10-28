import React from 'react';
import './GameBoard.css';
import SingleBoard from 'components/SingleBoard/SingleBoard'

class GameBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      turnVal: 1,
      selected: {
        piece: { board: null, square: null },
        move: { board: null, square: null }
      },
      squares: [
        [ 1, 1, 1, 1, null, null, null, null, null, null, null, null, 0, 0, 0, 0],
        [ 1, 1, 1, 1, null, null, null, null, null, null, null, null, 0, 0, 0, 0],
        [ 1, 1, 1, 1, null, null, null, null, null, null, null, null, 0, 0, 0, 0],
        [ 1, 1, 1, 1, null, null, null, null, null, null, null, null, 0, 0, 0, 0]
      ],
      validSquares: []
    };
  }

  getCoords(i) {
    return [i % 4, Math.floor(i / 4)];
  }

  // isValidActiveMove(selected) {
  //   if (!this.firstBoardSelected()) return false;
  //   let start = this.getCoords(this.state.selected.piece.square)
  //   let finish = this.getCoords(this.state.selected.move.square)
  //   [0,0] [2, 2]
  //   if (start[0])
  // }

  isValidSelection(current, next) {
    console.log(current, next);
    let valid = true;
    let currentCoords = this.getCoords(current);
    let nextCoords = this.getCoords(next);

    let currentDist = Math.abs(currentCoords[0] - nextCoords[0]);
    let nextDist = Math.abs(currentCoords[1] - nextCoords[1]);

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

  firstBoardSelected () {
    return this.state.selected.piece.board !== null &&
      this.state.selected.piece.square !== null &&
      this.state.selected.move.board !== null &&
      this.state.selected.move.square !== null
  }

  canSelect(board, square) {
    let clickedCoordsVal = this.state.squares[board][square]
    if (clickedCoordsVal === this.state.turnVal) {
      return 'piece'
    } else if (!this.state.selected.move.board &&
      this.state.selected.piece.board === board &&
      clickedCoordsVal === null &&
      this.isValidSelection(this.state.selected.piece.square, square)) {
      return 'move'
    }
    return ''
  }

  clearSelected() {
    let resetSelected = {
      piece: { board: null, square: null },
      move: { board: null, square: null }
    }
    this.setState({selected: resetSelected})
  }
  switchTurn() {
    let newTurn = this.state.turnVal === 1 ? 0 : 1;
    this.setState({turnVal: newTurn});
  }
  updateGameState (board, square) {
    let newSquares = this.state.squares;
    let distance = this.state.selected.move.square - this.state.selected.piece.square;
    newSquares[this.state.selected.piece.board][this.state.selected.piece.square] = null;
    newSquares[this.state.selected.move.board][this.state.selected.move.square] = this.state.turnVal;
    newSquares[board][square] = null;
    newSquares[board][square + distance] = this.state.turnVal;
    this.clearSelected();
    this.switchTurn();
    this.setState({squares: newSquares});
  }

  handleClick(board, square) {
    if (this.state.selected.piece.board === board && this.state.selected.piece.square === square) {
      this.clearSelected();
      return;
    }

    if (this.state.selected.piece.board !== board) {
      if (this.isValidActiveMove()) {
        this.updateGameState(board, square)
      } else {
        return;
      }
    } else {
      let newSelection = this.canSelect(board, square);
      if (newSelection) {
        let newSelectedState = this.state.selected;
        newSelectedState[newSelection] = { board: board, square: square };
        var validSquares = [];
        if (newSelection === 'piece') {
          newSelectedState.move = { board: null, square: null };
          let currentBoard = this.state.squares[board]
          for (let i = 0; i < currentBoard.length; i++) {
            if (currentBoard[i] !== null) continue;
            if (this.isValidSelection(square, i)) {
              validSquares.push(i);
            }
          }
        }
        this.setState({ selected: newSelectedState, validSquares: validSquares});
      }
    }
  }

  currentSelections(board) {
    let selections = []
    if (board === this.state.selected.piece.board) {
      selections.push(this.state.selected.piece.square)
    }
    if (board === this.state.selected.move.board) {
      selections.push(this.state.selected.move.square)
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
            validSquares={this.state.selected.piece.board === 0 ? this.state.validSquares : []}
            squares={this.state.squares[0]}></SingleBoard>
          <SingleBoard
            onClick={(i) => this.handleClick(1, i)}
            selections={this.currentSelections(1)}
            validSquares={this.state.selected.piece.board === 1 ? this.state.validSquares : []}
            squares={this.state.squares[1]}></SingleBoard>
        </div>
        <div className="game-board-row">
          <SingleBoard
            onClick={(i) => this.handleClick(2, i)}
            selections={this.currentSelections(2)}
            validSquares={this.state.selected.piece.board === 2? this.state.validSquares : []}
            squares={this.state.squares[2]}></SingleBoard>
          <SingleBoard
            onClick={(i) => this.handleClick(3, i)}
            selections={this.currentSelections(3)}
            validSquares={this.state.selected.piece.board === 3? this.state.validSquares : []}
            squares={this.state.squares[3]}></SingleBoard>
        </div>
      </div>
    );
  }
}

export default GameBoard;
