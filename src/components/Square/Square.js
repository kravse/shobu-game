import React from 'react';
import './Square.css';

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <button
        className={'square' + (this.props.selected ? ' selected' : '') + (this.props.canSelect ? ' selectable' : '')}
        onClick={this.props.onClick}>
        {this.props.value === 1 ? '◉' : (this.props.value === 0 ? '◎' : '') }
      </button>
    );
  }
}

export default Square;
