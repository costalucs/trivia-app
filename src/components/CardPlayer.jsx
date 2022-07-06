import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './css/CardPlayer.css';

class CardPlayer extends Component {
  render() {
    const { src, name, score, index } = this.props;
    return (
      <div className="card-player">
        <div>

          <img
            src={ src }
            alt={ name }
          />
        </div>
        <div>

          <p data-testid={ `player-name-${index}` }>{name}</p>
          <p>Score:</p>
          <span
            data-testid={ `player-score-${index}` }
          >
            {score}
          </span>
        </div>
      </div>
    );
  }
}

CardPlayer.propTypes = {
  src: PropTypes.string,
  name: PropTypes.string,
  score: PropTypes.number,
}.isRequired;

export default CardPlayer;
