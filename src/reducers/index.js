import { combineReducers } from 'redux';
import player from './player';
// import ranking from './Ranking';
// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global
const rootReducer = combineReducers({ player });

export default rootReducer;
