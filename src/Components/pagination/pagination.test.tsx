import { describe, test, expect, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Pagination } from './pagination';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import mockRouter from 'next-router-mock';
import { ThemeProvider } from '../context/themeContext';

const mockStore = configureStore([]);

describe('test pagination component', () => {
  let store: ReturnType<typeof mockStore>;
  const allPokemons = {
    allPokemons: [
      {
        name: 'bulbasaur',
        url: 'https://pokeapi.co/api/v2/pokemon/1/',
      },
      {
        name: 'ivysaur',
        url: 'https://pokeapi.co/api/v2/pokemon/2/',
      },
    ],
  };

  beforeEach(() => {
    const initialState = {
      updatePokemons: {
        filteredPokemons: Array(50).fill({}),
      },
      paginationSlice: {
        currentPage: 1,
        currentGroup: 0,
      },
      pokemonListSlice: {
        searchValue: '',
      },
    };

    store = mockStore(initialState);
  });

  test('renders pagination buttons and items', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <Pagination allPokemons={allPokemons.allPokemons} />
        </ThemeProvider>
      </Provider>
    );

    const leftButton = screen.getByTestId('button-left');
    const rightButton = screen.getByTestId('button-right');

    expect(leftButton).toBeInTheDocument();
    expect(rightButton).toBeInTheDocument();
    expect(screen.getAllByRole('link')).toHaveLength(1);
  });

  test('disables left button on first group', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <Pagination allPokemons={allPokemons.allPokemons} />
        </ThemeProvider>
      </Provider>
    );

    const leftButton = screen.getByTestId('button-left');

    expect(leftButton).toBeDisabled();
  });

  test('changes pages on link click', () => {
    render(
      <Provider store={store}>
        <RouterContext.Provider value={mockRouter}>
          <ThemeProvider>
            <Pagination allPokemons={allPokemons.allPokemons} />
          </ThemeProvider>
        </RouterContext.Provider>
      </Provider>
    );

    const pageLink = screen.getByText('1');
    fireEvent.click(pageLink);
    const actions = store.getActions();
    expect(actions).toEqual([
      { type: 'pagination/setCurrentPage', payload: 1 },
      { type: 'pokemonList/setNameSelectedPokemon', payload: '' },
    ]);
  });
});
