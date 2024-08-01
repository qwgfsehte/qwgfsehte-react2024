import '@testing-library/jest-dom';
import { describe, test, expect, vi, afterEach } from 'vitest';
import pokemonListReducer, {
  addItem,
  clearItems,
  initialState,
  removeItem,
  setNameSelectedPokemon,
  setPokemonPage,
} from './pokemonList.slice';
import { Pokeball } from './pokeball';
import { render } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import { ThemeProvider } from '../../../Components/context/themeContext';

describe('test pokemon list component', () => {
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
});
