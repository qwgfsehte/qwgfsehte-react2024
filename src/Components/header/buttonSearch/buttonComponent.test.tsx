import { describe, test, vi, beforeEach, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchButton from './buttonComponent';
import { Store, UnknownAction } from '@reduxjs/toolkit/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { ThemeProvider } from '../../../Components/context/themeContext';

const mockStore = configureStore([]);

describe('test search button component', () => {
  let store: Store<unknown, UnknownAction, unknown>;

  beforeEach(() => {
    vi.clearAllMocks();

    store = mockStore({
      updatePokemons: {
        filteredPokemons: [{ id: 1 }, { id: 2 }, { id: 3 }],
      },
    });
  });

  test('render search button and click', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <SearchButton />
        </ThemeProvider>
      </Provider>
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
