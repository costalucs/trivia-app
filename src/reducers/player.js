import { SEND_SCORE, SET_USER_NAME, ZERAR_SCORE } from '../action';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_USER_NAME:
    return {
      ...state,
      name: action.state.name,
      gravatarEmail: action.state.email,
    };
  case SEND_SCORE:
    return {
      ...state,
      score: state.score + action.score,
      assertions: state.assertions + action.assertions,
    };
  case ZERAR_SCORE:
    return {
      name: '',
      assertions: 0,
      score: 0,
      gravatarEmail: '',
    };
  default:
    return state;
  }
};

export default player;
