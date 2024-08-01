import '@testing-library/jest-dom';
import { describe, test, expect, vi, beforeEach, Mock } from 'vitest';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { PokemonDetailsInfo } from './pokemonDetailsInfo';
import configureStore from 'redux-mock-store';
import { pokemonApi } from './../../pokemonAPI';
import mockRouter from 'next-router-mock';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';

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
  sprites: { front_default: 'https://pikachu.png' },
  types: [{ type: { name: 'electric' } }],
  cries: { latest: 'latest.mp3', legacy: 'legacy.mp3' },
  weight: 60,
  height: 4,
  abilities: [{ ability: { name: 'static' } }],
  stats: [{ stat: { name: 'speed' }, base_stat: 90 }],
  id: '1',
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
    mockRouter.setCurrentUrl('/search/page/1');
  });

  test('render pokemon details', () => {
    (pokemonApi.useFetchPokemonDetailsQuery as Mock).mockReturnValue({
      data: mockData,
    });

    render(
      <Provider store={store}>
        <RouterContext.Provider value={mockRouter}>
          <PokemonDetailsInfo data={mockData} />
        </RouterContext.Provider>
      </Provider>
    );

    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.getByAltText('pikachu')).toHaveAttribute(
      'src',
      '/_next/image?url=https%3A%2F%2Fpikachu.png&w=640&q=75'
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
