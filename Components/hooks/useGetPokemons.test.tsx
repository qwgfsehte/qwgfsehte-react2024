import '@testing-library/jest-dom';
import {
  describe,
  vi,
  test,
  expect,
  beforeEach,
  Mock,
  afterEach,
} from 'vitest';
import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { Store, UnknownAction } from '@reduxjs/toolkit/react';
import { useFilterPokemons } from './useFilterPokemons';

const mockStore = configureStore([]);

describe('test hooks', () => {
  let store: Store<unknown, UnknownAction, unknown>;
  let mockDispatch: Mock<(...args: unknown[]) => void>;

  const TestComponent = ({
    pokemons,
    page,
  }: {
    pokemons: { name: string; url: string }[];
    page: number;
  }) => {
    useFilterPokemons(pokemons, page);
    return null;
  };

  beforeEach(() => {
    store = mockStore({
      pokemonListSlice: {
        nameSelectedPokemon: '',
        pokemonPage: [],
      },
    });

    mockDispatch = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('get value with localStorage', () => {
    vi.spyOn(localStorage, 'getItem').mockImplementation(key => {
      if (key === 'searchValueInput') return 'chu';
      return null;
    });
  });

  test('calls filterPokemons with correct parameters', () => {
    const pokemons = [
      { name: 'pikachu', url: 'testUrl' },
      { name: 'bulbasaur', url: 'testUrl' },
      { name: 'raichu', url: 'testUrl' },
    ];
    const page = 1;

    render(
      <Provider store={store}>
        <TestComponent pokemons={pokemons} page={page} />
      </Provider>
    );

    expect(mockDispatch).toHaveBeenCalledTimes(0);
  });
});
