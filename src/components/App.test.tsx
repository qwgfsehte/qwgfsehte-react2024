import { describe, vi, test, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { App } from './App';
import { useGetPokemons } from './hooks/useGetPokemons';
import { InfoPokemon } from '../interfaces/interface';

vi.mock('./hooks/useGetPokemons');

describe('test app component', () => {
  const testUseGetPokemons = {
    allPokemons: [],
    pokemonData: [] as InfoPokemon[],
    loading: false,
    errorMessage: '',
    getInfoPokemons: vi.fn(),
    currentPage: 1,
    setCurrentPage: vi.fn(),
    handleNextPage: vi.fn(),
    handlePrevPage: vi.fn(),
    countPages: [[]],
    selectedPokemon: null,
    setSelectedPokemon: vi.fn(),
  };

  beforeEach(() => {
    (useGetPokemons as ReturnType<typeof vi.fn>).mockReturnValue(
      testUseGetPokemons
    );
  });

  test('render header and loading indicator components', () => {
    testUseGetPokemons.loading = true;
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('PokePedia')).toBeInTheDocument();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('render errorMessage component', () => {
    testUseGetPokemons.loading = false;
    testUseGetPokemons.errorMessage = 'Error message';
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  test('render pokemons list when correct data', async () => {
    testUseGetPokemons.loading = false;
    testUseGetPokemons.errorMessage = '';
    testUseGetPokemons.pokemonData = [
      {
        id: '1',
        name: 'bulbasaur',
        sprites: {
          front_default:
            'https://raw.example.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
        },
        types: [{ type: { name: 'grass' } }, { type: { name: 'poison' } }],
        weight: 69,
        height: 7,
        abilities: [
          { ability: { name: 'overgrow' } },
          { ability: { name: 'chlorophyll' } },
        ],
        stats: [
          {
            base_stat: 45,
            stat: {
              name: 'hp',
            },
          },
          {
            base_stat: 49,
            stat: {
              name: 'attack',
            },
          },
          {
            base_stat: 49,
            stat: {
              name: 'defense',
            },
          },
          {
            base_stat: 65,
            stat: {
              name: 'special-attack',
            },
          },
          {
            base_stat: 65,
            stat: {
              name: 'special-defense',
            },
          },
          {
            base_stat: 45,
            stat: {
              name: 'speed',
            },
          },
        ],
        cries: {
          latest:
            'https://raw.example.com/PokeAPI/cries/main/cries/pokemon/latest/1.ogg',
          legacy:
            'https://raw.example.com/PokeAPI/cries/main/cries/pokemon/legacy/1.ogg',
        },
      },
    ];
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByText('Bulbasaur')).toBeInTheDocument()
    );
  });

  test('calls getInfoPokemons when click on button in Header component', async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByTestId('search-button'));
    await waitFor(() =>
      expect(testUseGetPokemons.getInfoPokemons).toHaveBeenCalled()
    );
  });

  test('set pokemon when on click on pokemon card', async () => {
    testUseGetPokemons.setSelectedPokemon = vi.fn();
    testUseGetPokemons.pokemonData = [
      {
        id: '1',
        name: 'bulbasaur',
        sprites: {
          front_default:
            'https://raw.example.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
        },
        types: [{ type: { name: 'grass' } }, { type: { name: 'poison' } }],
        weight: 69,
        height: 7,
        abilities: [
          { ability: { name: 'overgrow' } },
          { ability: { name: 'chlorophyll' } },
        ],
        stats: [
          {
            base_stat: 45,
            stat: {
              name: 'hp',
            },
          },
          {
            base_stat: 49,
            stat: {
              name: 'attack',
            },
          },
          {
            base_stat: 49,
            stat: {
              name: 'defense',
            },
          },
          {
            base_stat: 65,
            stat: {
              name: 'special-attack',
            },
          },
          {
            base_stat: 65,
            stat: {
              name: 'special-defense',
            },
          },
          {
            base_stat: 45,
            stat: {
              name: 'speed',
            },
          },
        ],
        cries: {
          latest:
            'https://raw.example.com/PokeAPI/cries/main/cries/pokemon/latest/1.ogg',
          legacy:
            'https://raw.example.com/PokeAPI/cries/main/cries/pokemon/legacy/1.ogg',
        },
      },
    ];

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Bulbasaur'));
    await waitFor(() =>
      expect(testUseGetPokemons.setSelectedPokemon).toHaveBeenCalledWith({
        id: '1',
        name: 'bulbasaur',
        sprites: {
          front_default:
            'https://raw.example.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
        },
        types: [{ type: { name: 'grass' } }, { type: { name: 'poison' } }],
        weight: 69,
        height: 7,
        abilities: [
          { ability: { name: 'overgrow' } },
          { ability: { name: 'chlorophyll' } },
        ],
        stats: [
          {
            base_stat: 45,
            stat: {
              name: 'hp',
            },
          },
          {
            base_stat: 49,
            stat: {
              name: 'attack',
            },
          },
          {
            base_stat: 49,
            stat: {
              name: 'defense',
            },
          },
          {
            base_stat: 65,
            stat: {
              name: 'special-attack',
            },
          },
          {
            base_stat: 65,
            stat: {
              name: 'special-defense',
            },
          },
          {
            base_stat: 45,
            stat: {
              name: 'speed',
            },
          },
        ],
        cries: {
          latest:
            'https://raw.example.com/PokeAPI/cries/main/cries/pokemon/latest/1.ogg',
          legacy:
            'https://raw.example.com/PokeAPI/cries/main/cries/pokemon/legacy/1.ogg',
        },
      })
    );
  });
});
