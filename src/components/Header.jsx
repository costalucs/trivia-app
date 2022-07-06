import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import logo from '../trivia.png';
import { getAvatarToken } from '../services';

class Header extends Component {
  render() {
    const { name, assertions, email } = this.props;
    const src = getAvatarToken(email);
    return (
      <header>
        <img className="App-logo" src={ logo } alt="Trivia" />
        <div>
          <p data-testid="header-player-name">{name}</p>
          <img src={ src } data-testid="header-profile-picture" alt={ src } />
          <p data-testid="header-score">{assertions}</p>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  name: state.player.name,
  assertions: state.player.score,
  email: state.player.gravatarEmail,
});

export default connect(mapStateToProps)(Header);
