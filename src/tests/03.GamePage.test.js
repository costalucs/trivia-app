import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Testando a Game page', () => {

  test('', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const name = screen.getByTestId("input-player-name");
    const email = screen.getByTestId('input-gravatar-email');
    const playBtn = screen.getByRole('button', {name: /play/i})

    userEvent.type(name, 'Lucas Costa')
    userEvent.type(email, 'ldesouza40@gmail.com')
    userEvent.click(playBtn)

    await waitFor(() => {
      expect(history.location.pathname).toBe('/game')
      const btnCorrect = screen.getByTestId('correct-answer')
      expect(btnCorrect).toBeInTheDocument()
      userEvent.click(btnCorrect)
      expect(btnCorrect.disabled).toBeTruthy()
    })

  })
})