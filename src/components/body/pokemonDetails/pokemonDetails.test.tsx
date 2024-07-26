import '@testing-library/jest-dom';
import { describe, test, expect, vi, beforeEach, Mock } from 'vitest';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { PokemonDetailsInfo } from './pokemonDetailsInfo';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { pokemonApi } from '../../pokemonAPI';

const mockStore = configureStore([]);
const initialState = {
  pokemonListSlice: {
    nameSelectedPokemon: 'pikachu',
    pokemonPage: [],
    selectedPokemons: [],
  },
  paginationSlice: {
    currentPage: 1,
    currentGroup: 0,
  },
  pokemonDetailsSlice: {
    error: 'Error message',
  },
};

const mockData = {
  name: 'pikachu',
  sprites: { front_default: 'pikachu.png' },
  types: [{ type: { name: 'electric' } }],
  cries: { latest: 'latest.mp3', legacy: 'legacy.mp3' },
  weight: 60,
  height: 4,
  abilities: [{ ability: { name: 'static' } }],
  stats: [{ stat: { name: 'speed' }, base_stat: 90 }],
};

vi.mock('../../pokemonAPI', () => ({
  pokemonApi: {
    useFetchPokemonDetailsQuery: vi.fn(),
  },
}));

describe('PokemonDetailsInfo', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore(initialState);

    (pokemonApi.useFetchPokemonDetailsQuery as Mock).mockReset();
  });

  test('render loading state', () => {
    (pokemonApi.useFetchPokemonDetailsQuery as Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: false,
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <PokemonDetailsInfo />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('render error state', () => {
    (pokemonApi.useFetchPokemonDetailsQuery as Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: 'Error message',
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <PokemonDetailsInfo />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  test('render pokemon details', () => {
    (pokemonApi.useFetchPokemonDetailsQuery as Mock).mockReturnValue({
      data: mockData,
      isLoading: false,
      error: false,
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <PokemonDetailsInfo />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('pikachu')).toBeInTheDocument();
    expect(screen.getByAltText('pikachu')).toHaveAttribute(
      'src',
      'pikachu.png'
    );
    expect(screen.getByText('Types:')).toBeInTheDocument();
    expect(screen.getByText('electric')).toBeInTheDocument();
    expect(screen.getByText('Latest cry:')).toBeInTheDocument();
    expect(screen.getByText('Legacy cry:')).toBeInTheDocument();
    expect(screen.getByText('Weight:60')).toBeInTheDocument();
    expect(screen.getByText('Height:4')).toBeInTheDocument();
    expect(screen.getByText('Abilities:')).toBeInTheDocument();
    expect(screen.getByText('static')).toBeInTheDocument();
    expect(screen.getByText('Stats:')).toBeInTheDocument();
    expect(screen.getByText('speed:90')).toBeInTheDocument();
  });
});
