import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAvatarToken, getRanking, setRanking } from '../services';
import { zerarScore } from '../action';
import CardPlayer from '../components/CardPlayer';
import './css/Ranking.css';

class Ranking extends Component {
  state = {
    ranking: [],
  }

  componentDidMount() {
    const { name, picture, score } = this.props;
    const player1 = {
      name, picture, score,
    };
    setRanking(player1);
    this.setState({ ranking: getRanking() });
  }

  goHome = () => {
    const { history, dispatch } = this.props;
    dispatch(zerarScore());
    history.push('/');
  }

  render() {
    const { ranking } = this.state;

    return (
      <div className="ranking">
        {/* <Header /> */}
        <h1 data-testid="ranking-title">Ranking</h1>
        {ranking.map((player, index) => (
          <CardPlayer
            key={ index }
            src={ player.picture }
            name={ player.name }
            score={ player.score }
          />
          // <div key={ index }>
          /* <img
              src={ player.picture }
              alt={ player.name }
            />
            <p
              data-testid={ `player-score-${index}` }
            >
              {player.score}
            </p>
            <p data-testid={ `player-name-${index}` }>{player.name}</p>
          </div> */
        ))}
        <button
          onClick={ this.goHome }
          type="button"
          data-testid="btn-go-home"
        >
          para casa

        </button>

      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.object,
}.isRequired;
const mapStateToProps = ({ player }) => ({
  name: player.name,
  score: player.score,
  picture: getAvatarToken(player.gravatarEmail),
});

export default connect(mapStateToProps)(Ranking);
