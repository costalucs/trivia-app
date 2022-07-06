import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';

describe('Testando Login', () => {
  // beforeEach(cleanup)
  test('Crie um local para que o usuário insira seu nome, email e botão play', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const name = screen.getByTestId("input-player-name");
    const email = screen.getByTestId('input-gravatar-email');
    const playBtn = screen.getByTestId('btn-play')
    const settingBtn = screen.getByTestId('btn-settings')
    
    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(playBtn).toBeInTheDocument();
    expect(playBtn.disabled).toBeTruthy();
    expect(settingBtn).toBeInTheDocument();
    expect(history.location.pathname).toBe('/')    
  });
  
  test('Testando botao play', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const name = screen.getByTestId("input-player-name");
    const email = screen.getByTestId('input-gravatar-email');
    const playBtn = screen.getByTestId('btn-play')
    
    expect(playBtn.disabled).toBeTruthy();
    
    userEvent.type(name, 'Lucas Costa')
    userEvent.type(email, 'ldesouza40@gmail.com')
    expect(playBtn.disabled).toBeFalsy();
    
    await waitFor(() => {
      userEvent.click(playBtn)
      expect(history.location.pathname).toBe('/game')
    })
  })
  
  test('Testando botão Settings', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const settingBtn = screen.getByTestId('btn-settings')    
    userEvent.click(settingBtn)    
    expect(history.location.pathname).toBe('/settings')
  })
})