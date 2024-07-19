import '@testing-library/jest-dom';
import { describe, test, expect } from 'vitest';
import pokemonDetailsSlice, {
  initialState,
  setNewStateLoading,
} from './pokemonDetails.slice';

describe('test pokemon details component', () => {
  test('initial state', () => {
    const state = pokemonDetailsSlice(undefined, { type: 'unknow' });
    expect(state).toEqual(initialState);
  });

  test('test setNewStateLoading reducer', () => {
    const setPokemonPageState = pokemonDetailsSlice(
      initialState,
      setNewStateLoading(false)
    );
    expect(initialState.loading).toStrictEqual(true);
    expect(setPokemonPageState.loading).toStrictEqual(false);
  });
});
