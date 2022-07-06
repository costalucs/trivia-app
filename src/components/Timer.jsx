import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Timer extends Component {
  render() {
    const { sec } = this.props;
    return (
      <h1>{sec}</h1>
    );
  }
}

Timer.propTypes = {
  handleTimer: PropTypes.func,
}.isRequired;

export default Timer;
