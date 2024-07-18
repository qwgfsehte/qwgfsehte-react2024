import '@testing-library/jest-dom';
import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PokemonsList from './pokemonsList';

const COUNT_POKEMONS = 20;

describe('test pokemon list component', () => {
  test('render 20 pokemons', () => {
    const pokemonData = Array.from({ length: COUNT_POKEMONS }, (_, i) => ({
      id: String(i + 1),
      name: `Pokemon ${i + 1}`,
      sprites: { front_default: '' },
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
    }));

    render(<PokemonsList />);

    const pokemonCards = screen.getAllByAltText('pokemon');
    expect(pokemonCards).toHaveLength(COUNT_POKEMONS);
  });

  test('render', () => {
    const pokemonsList = [
      {
        id: '1',
        name: 'Bulbasaur',
        sprites: { front_default: '' },
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
      null,
      undefined,
    ];

    render(
      <PokemonsList pokemonsList={pokemonsList} onPokemonClick={() => {}} />
    );

    const placeholderElements = screen.getAllByText('pokemon not found');
    expect(placeholderElements).toHaveLength(2);
  });
});
