import { describe, test, expect, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import paginationReducer, {
  initialState,
  setCurrentGroup,
  setCurrentPage,
} from './pagination.slice';
import configureStore from 'redux-mock-store';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Pagination } from './pagination';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import mockRouter from 'next-router-mock';

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

  test('initial state', () => {
    const state = paginationReducer(undefined, { type: 'unknow' });
    expect(state).toEqual(initialState);
  });

  test('test setCurrentPage reducer', () => {
    const setCurrentPageState = paginationReducer(
      initialState,
      setCurrentPage(3)
    );
    expect(initialState.currentPage).toBe(1);
    expect(setCurrentPageState.currentPage).toBe(3);
  });

  test('test setCurrentGroup reducer', () => {
    const setCurrentPageState = paginationReducer(
      initialState,
      setCurrentGroup(2)
    );
    expect(initialState.currentGroup).toBe(0);
    expect(setCurrentPageState.currentGroup).toBe(2);
  });

  test('renders pagination buttons and items', () => {
    render(
      <Provider store={store}>
        <Pagination allPokemons={allPokemons.allPokemons} />
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
        <Pagination allPokemons={allPokemons.allPokemons} />
      </Provider>
    );

    const leftButton = screen.getByTestId('button-left');

    expect(leftButton).toBeDisabled();
  });

  test('changes pages on link click', () => {
    render(
      <Provider store={store}>
        <RouterContext.Provider value={mockRouter}>
          <Pagination allPokemons={allPokemons.allPokemons} />
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
