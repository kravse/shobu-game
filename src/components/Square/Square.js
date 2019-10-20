import React from 'react';
import './Square.css';

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <button className="square" onClick={this.props.onClick}>
        {this.props.value === 1 ? '◉' : (this.props.value === 0 ? '◎' : '') }
      </button>
    );
  }
}

export default Square;
