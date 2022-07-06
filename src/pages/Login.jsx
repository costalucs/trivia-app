import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getToken, { saveToken } from '../services';
import { setUser } from '../action';
import './css/Login.css';

class Login extends Component {
  state = {
    active: true,
    email: '',
    name: '',
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
    this.validateInput();
  }

  validateInput = () => {
    const { email, name } = this.state;
    const valEmail = this.validateEmail(email);
    const valName = name.length > 1;
    if (valEmail && valName) {
      return this.setState({ active: false });
    }
  }

  validateEmail = () => {
    const { email } = this.state;
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  handleClick = async () => {
    const { history } = this.props;
    this.setUser();
    const tokenObject = await getToken();
    saveToken(tokenObject.token);
    history.push('/game');
  }

  setUser = () => {
    const { settingUser } = this.props;
    const { state } = this;
    settingUser(state);
  }

  goSettings = () => {
    const { history } = this.props;
    history.push('/settings');
  }

  render() {
    const { active } = this.state;
    return (
      <form className="login">
        <input
          onChange={ this.handleChange }
          data-testid="input-player-name"
          type="text"
          name="name"
          placeholder="Name"
        />
        <input
          onChange={ this.handleChange }
          data-testid="input-gravatar-email"
          type="email"
          name="email"
          placeholder="example@example.com"
        />
        <button
          onClick={ this.handleClick }
          disabled={ active }
          type="button"
          data-testid="btn-play"
        >
          Play

        </button>
        <button
          onClick={ this.goSettings }
          type="button"
          data-testid="btn-settings"
        >
          Settings

        </button>
      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.object,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  settingUser: (payload) => dispatch(setUser(payload)),
});

export default connect(null, mapDispatchToProps)(Login);
