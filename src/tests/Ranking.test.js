import React from 'react';
import userEvent from '@testing-library/user-event';
import { cleanup, screen } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'
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

describe('Testando pagina ranking', () => {
  test('Testando botão go home', () => {
    const { history } = renderWithRouterAndRedux(<App/>, initialState, '/ranking');
    const goHomeButton = screen.getByTestId('btn-go-home')

    userEvent.click(goHomeButton)

    expect(history.location.pathname).toBe('/')


    
  })
})