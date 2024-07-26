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
import { render, screen, fireEvent } from '@testing-library/react';
import PokemonsList from './pokemonsList';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

const mockStore = configureStore([]);

describe('test pokemon list component', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    const initialState = {
      pokemonListSlice: {
        nameSelectedPokemon: '',
        pokemonPage: [
          { name: 'Pikachu', url: 'url1' },
          { name: 'Charmander', url: 'url2' },
        ],
        selectedPokemons: [],
      },
    };

    store = mockStore(initialState);
  });

  afterEach(() => {
    vi.clearAllMocks();
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
    const { container } = render(<Pokeball />);
    expect(container.firstChild).toHaveClass('pokeball');
  });

  test('render pokemons list component', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <PokemonsList />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.getByText('Charmander')).toBeInTheDocument();
  });

  test('handles checkbox change', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <PokemonsList />
        </MemoryRouter>
      </Provider>
    );

    const checkbox = screen.getByTestId('checkbox-Pikachu-0');
    fireEvent.click(checkbox);
    expect(store.getActions()).toContainEqual(addItem('Pikachu - url1'));
  });

  test('renders placeholder when pokemon not found', () => {
    store = mockStore({
      pokemonListSlice: {
        pokemonPage: [null],
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <PokemonsList />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('pokemon not found')).toBeInTheDocument();
  });
});
