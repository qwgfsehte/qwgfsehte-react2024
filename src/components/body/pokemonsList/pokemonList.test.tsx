import '@testing-library/jest-dom';
import { describe, test, expect, vi, afterEach } from 'vitest';
import pokemonListReducer, {
  initialState,
  setNameSelectedPokemon,
  setPokemonPage,
} from './pokemonList.slice';
import { Pokeball } from './pokeball';
import { render, screen } from '@testing-library/react';
import PokemonsList from './pokemonsList';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

const mockStore = configureStore([]);
describe('test pokemon list component', () => {
  const store = mockStore({
    pokemonListSlice: {
      nameSelectedPokemon: 'pikachu',
      pokemonPage: [
        { name: 'pikachu' },
        { name: 'bulbasaur' },
        { name: 'test' },
      ],
    },
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
    expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
  });
});
