import { describe, vi, test, expect, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import '@testing-library/jest-dom';
import Header from './header';
import { Store, UnknownAction } from '@reduxjs/toolkit/react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '../context/themeContext';

const mockStore = configureStore([]);

describe('test header component', () => {
  let store: Store<unknown, UnknownAction, unknown>;

  beforeEach(() => {
    vi.clearAllMocks();

    store = mockStore({
      updatePokemons: {
        filteredPokemons: [{ id: 1 }, { id: 2 }, { id: 3 }],
      },
    });
  });

  beforeEach(() => {
    localStorage.setItem('searchValueInput', 'bulbasaur');
  });

  afterEach(() => {
    localStorage.clear();
  });

  test('render logo and title', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <Header />
        </ThemeProvider>
      </Provider>
    );
    expect(screen.getByAltText('logo-pokepedia')).toBeInTheDocument();
    expect(screen.getByText('PokePedia')).toBeInTheDocument();
  });

  test('get value from localStorage and uses value as input value', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <Header />
        </ThemeProvider>
      </Provider>
    );
    const input = screen.getByRole('textbox');
    expect((input as HTMLInputElement).value).toBe('bulbasaur');
  });
});
