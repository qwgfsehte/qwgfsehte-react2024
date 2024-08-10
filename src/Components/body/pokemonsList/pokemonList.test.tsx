import '@testing-library/jest-dom';
import { describe, test, expect, vi, afterEach, beforeEach } from 'vitest';
import pokemonListReducer, {
  addItem,
  clearItems,
  initialState,
  removeItem,
  setNameSelectedPokemon,
  setPokemonPage,
} from './pokemonList.slice';
import { Pokeball } from './pokeball';
import { fireEvent, render, screen } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import { ThemeProvider } from '../../../Components/context/themeContext';
import PokemonsList from './pokemonsList';
import configureStore from 'redux-mock-store';
import { Store, UnknownAction } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { AllPokemonsProps } from 'src/interfaces/interface';

const mockStore = configureStore([]);

describe('test pokemon list component', () => {
  let store: Store<unknown, UnknownAction, unknown>;
  let pokemonList: AllPokemonsProps;

  beforeEach(() => {
    vi.clearAllMocks();

    pokemonList = {
      allPokemons: [
        { name: 'pikachu', url: 'pikachu-url' },
        { name: 'charmander', url: 'charmander-url' },
      ],
    };

    store = mockStore({
      updatePokemons: {
        filteredPokemons: [{ id: 1 }, { id: 2 }, { id: 3 }],
      },
      paginationSlice: {
        currentPage: 1,
      },
      pokemonListSlice: {
        selectedPokemons: [],
        searchValue: '',
      },
    });
  });

  afterEach(() => {
    vi.clearAllMocks();

    mockRouter.setCurrentUrl('/search/page/1');
  });

  test('initial State', () => {
    const state = pokemonListReducer(undefined, { type: 'unknow' });
    expect(state).toEqual(initialState);
  });

  test('test setPokemonPage reducer', () => {
    const setPokemonPageState = pokemonListReducer(
      initialState,
      setPokemonPage([
        { name: 'bulbasaur', url: 'https://test.co/api/v2/pokemon/ivysaur' },
      ])
    );
    expect(initialState.pokemonPage).toStrictEqual([]);
    expect(setPokemonPageState.pokemonPage).toStrictEqual([
      { name: 'bulbasaur', url: 'https://test.co/api/v2/pokemon/ivysaur' },
    ]);
  });

  test('test setNameSelectedPokemon reducer', () => {
    const setNameSelectedPokemonState = pokemonListReducer(
      initialState,
      setNameSelectedPokemon('bulbasaur')
    );
    expect(initialState.nameSelectedPokemon).toStrictEqual('');
    expect(setNameSelectedPokemonState.nameSelectedPokemon).toStrictEqual(
      'bulbasaur'
    );
  });

  test('test addItem reducer', () => {
    const setNameSelectedPokemonState = pokemonListReducer(
      initialState,
      addItem('bulbasaur')
    );
    expect(initialState.selectedPokemons).toStrictEqual([]);
    expect(setNameSelectedPokemonState.selectedPokemons).toStrictEqual([
      'bulbasaur',
    ]);
  });

  test('test clearItems reducer', () => {
    const modifiedState = {
      ...initialState,
      selectedPokemons: ['bulbasaur', 'charmander'],
    };

    const newState = pokemonListReducer(modifiedState, clearItems([]));
    expect(newState.selectedPokemons).toStrictEqual([]);
  });

  test('test removeItem reducer', () => {
    const modifiedState = {
      ...initialState,
      selectedPokemons: ['bulbasaur', 'charmander'],
    };

    const newState = pokemonListReducer(modifiedState, removeItem('bulbasaur'));
    expect(newState.selectedPokemons).toStrictEqual(['charmander']);
  });

  test('render pokeball component', () => {
    const { container } = render(
      <ThemeProvider>
        <Pokeball />
      </ThemeProvider>
    );
    expect(container.firstChild).toHaveClass('_pokeball_8ab701');
  });

  test('render error with empty data', () => {
    render(
      <Provider store={store}>
        <RouterContext.Provider value={mockRouter}>
          <ThemeProvider>
            <PokemonsList allPokemons={[]} />
          </ThemeProvider>
        </RouterContext.Provider>
      </Provider>
    );
    expect(
      screen.getByText('No pokemons found. Please try another search term.')
    ).toBeInTheDocument();
  });

  test('render pokemons list with correct data', () => {
    render(
      <Provider store={store}>
        <RouterContext.Provider value={mockRouter}>
          <ThemeProvider>
            <PokemonsList {...pokemonList} />
          </ThemeProvider>
        </RouterContext.Provider>
      </Provider>
    );

    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.getByText('Charmander')).toBeInTheDocument();
  });

  test('handle checkbox change', () => {
    const mockDispatch = vi.fn();

    render(
      <Provider store={store}>
        <RouterContext.Provider value={mockRouter}>
          <ThemeProvider>
            <PokemonsList {...pokemonList} />
          </ThemeProvider>
        </RouterContext.Provider>
      </Provider>
    );

    const checkbox = screen.getByTestId('checkbox-pikachu-0');
    fireEvent.click(checkbox);

    expect(mockDispatch).toHaveBeenCalledTimes(0);
  });
});
