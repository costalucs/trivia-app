import React from 'react';
import userEvent from '@testing-library/user-event';
import { cleanup, screen } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'
import Feedback from '../pages/Feedback';
import App from '../App';

const initialState = {
  player: {
    name: 'Player Name',
    gravatarEmail: 'player@email.com',
    score: 0,
    assertions: 3,
    token: "",
  }
}

describe('Testando a página Feedback', () => {
  beforeEach(cleanup)

  test('Testando inputs', () => {
    const { history } = renderWithRouterAndRedux(<App/>, initialState, '/feedback');

    const name = screen.getByTestId("header-player-name");
    const pic = screen.getByTestId('header-profile-picture');
    const feedbackTest = screen.getByTestId('feedback-text');
    const score = screen.getByTestId('feedback-total-score');
    const btnPlayAgain = screen.getByTestId('btn-play-again');
    const btnRanking = screen.getByTestId('btn-ranking');

    expect(name).toBeInTheDocument();
    expect(pic).toBeInTheDocument();
    expect(feedbackTest).toBeInTheDocument();
    expect(feedbackTest.textContent).toBe('Well Done!');
    expect(score).toBeInTheDocument();
    expect(btnPlayAgain).toBeInTheDocument();
    expect(btnRanking).toBeInTheDocument();

    userEvent.click(btnPlayAgain)

    expect(history.location.pathname).toBe('/')
    
  })

  test('Testando botão Ranking', () => {
    const {history} = renderWithRouterAndRedux(<App/>, initialState, '/feedback');
    const btnRanking = screen.getByTestId('btn-ranking');
    
    expect(btnRanking).toBeInTheDocument();
    
    userEvent.click(btnRanking)
    expect(history.location.pathname).toBe('/ranking')  

  })
  

})

