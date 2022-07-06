import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { zerarScore } from '../action';

class Feedback extends Component {
  feedback = () => {
    const { assertions } = this.props;
    const tres = 3;
    return assertions < tres ? 'Could be better...' : 'Well Done!';
  };

  playAgain = () => {
    const { history, dispatch } = this.props;
    dispatch(zerarScore());
    return history.push('/');
  }

  render() {
    const { assertions, score, history } = this.props;
    return (
      <>
        <Header />
        <h2 data-testid="feedback-text">{this.feedback()}</h2>
        <p data-testid="feedback-total-score">{score}</p>
        <p data-testid="feedback-total-question">{assertions}</p>
        <button
          onClick={ this.playAgain }
          type="button"
          data-testid="btn-play-again"
        >
          Play Again

        </button>

        <button
          onClick={ () => history.push('/ranking') }
          type="button"
          data-testid="btn-ranking"
        >
          Ranking
        </button>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

Feedback.propTypes = {
  history: PropTypes.object,
}.isRequired;

export default connect(mapStateToProps)(Feedback);
