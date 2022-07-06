import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Question from '../components/Question';
import './css/Game.css';

class Game extends Component {
  render() {
    const { history, dispatch } = this.props;
    return (
      <>
        <Header />
        <Question history={ history } dispatch={ dispatch } />
      </>);
  }
}

Game.propTypes = {
  history: PropTypes.object,
}.irRequired;

export default Game;
