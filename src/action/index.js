export const SET_TOKEN = 'SET_TOKEN';
export const SET_USER_NAME = 'SET_USER_NAME';
export const SEND_SCORE = 'SEND_SCORE';
export const SET_RANKING = 'SET_RANKING';
export const ZERAR_SCORE = 'ZERAR_SCORE';

export const creatToken = (token) => ({
  type: SET_TOKEN,
  token,
});

export const setUser = (state) => ({
  type: SET_USER_NAME,
  state,
});

export const sendScore = (score, assertions) => ({
  type: SEND_SCORE,
  score,
  assertions,
});

export const zerarScore = () => ({
  type: ZERAR_SCORE,
});

export const setRanking = (ranking) => ({
  type: SET_RANKING,
  ranking,
});
