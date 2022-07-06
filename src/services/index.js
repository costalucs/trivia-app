import md5 from 'crypto-js/md5';
import { creatToken } from '../action';

const API_URL = 'https://opentdb.com/api_token.php?command=request';

const getToken = async () => {
  const response = await fetch(API_URL);
  const json = await response.json();
  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};

export const tokenThunk = () => async (dispatch) => {
  const featchApi = await getToken();
  dispatch(creatToken(featchApi));
};

export const getAvatarToken = (email) => {
  const hashEmail = md5(email).toString();
  const srcImg = `https://www.gravatar.com/avatar/${hashEmail}`;
  return srcImg;
};

export const getQuestionsFromApi = async (token) => {
  const url = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const response = await fetch(url);
  const json = await response.json();
  // return response.ok ? Promise.resolve(json) : Promise.reject(json);
  return json;
};

export const saveToken = (user) => localStorage.setItem('token', user);
export const savePlayer = (user) => localStorage.setItem('token', user);
export const getTokenFromLocalStorage = () => localStorage.getItem('token');

export const getRanking = () => JSON.parse(localStorage.getItem('ranking'));
export const setRanking = (ranking) => {
  if (localStorage.getItem('ranking') === null) {
    return localStorage.setItem('ranking', JSON.stringify([ranking]));
  }
  const rankingArray = getRanking();
  const newRankingArray = [...rankingArray, ranking].sort((a, b) => b.score - a.score);
  localStorage.setItem('ranking', JSON.stringify(newRankingArray));
};

export default getToken;
