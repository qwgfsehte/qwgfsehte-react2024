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
import { MemoryRouter } from 'react-router-dom';
import { Pagination } from './pagination';

const mockStore = configureStore([]);

describe('test pagination component', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    const initialState = {
      updatePokemons: {
        filteredPokemons: Array(50).fill({}),
      },
      paginationSlice: {
        currentPage: 1,
        currentGroup: 0,
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
        <MemoryRouter>
          <Pagination />
        </MemoryRouter>
      </Provider>
    );

    const leftButton = screen.getByTestId('button-left');
    const rightButton = screen.getByTestId('button-right');

    expect(leftButton).toBeInTheDocument();
    expect(rightButton).toBeInTheDocument();
    expect(screen.getAllByRole('link')).toHaveLength(10);
  });

  test('disables left button on first group', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Pagination />
        </MemoryRouter>
      </Provider>
    );

    const leftButton = screen.getByTestId('button-left');

    expect(leftButton).toBeDisabled();
  });

  test('changes pages on link click', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Pagination />
        </MemoryRouter>
      </Provider>
    );

    const pageLink = screen.getByText('2');

    fireEvent.click(pageLink);

    expect(store.getActions()).toEqual([
      { type: 'pagination/setCurrentPage', payload: 2 },
      { type: 'pokemonList/setNameSelectedPokemon', payload: '' },
    ]);
  });
});
