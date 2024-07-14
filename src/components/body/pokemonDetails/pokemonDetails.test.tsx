import '@testing-library/jest-dom';
import { describe, vi, test, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { PokemonDetailsInfo } from './pokemonDetailsInfo';

describe('test pokemon details component', () => {
  const data = {
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
  };

  const onClick = vi.fn();

  test('render with correct data', () => {
    setTimeout(() => {
      render(<PokemonDetailsInfo data={data} onClose={onClick} />);
      expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
      expect(screen.getByAltText('bulbasaur')).toHaveAttribute(
        'src',
        data.sprites.front_default
      );
      expect(screen.getByText('grass')).toBeInTheDocument();
      expect(screen.getByText('Weight:69')).toBeInTheDocument();
      expect(screen.getByText('Height:7')).toBeInTheDocument();
      expect(screen.getByText('hp:45')).toBeInTheDocument();
      expect(screen.getByText('attack:49')).toBeInTheDocument();
      expect(screen.getByText('overgrow')).toBeInTheDocument();
    }, 100);
  });

  test('close right panel when click on button', () => {
    setTimeout(() => {
      render(<PokemonDetailsInfo data={data} onClose={onClick} />);
      const closeButton = screen.getByTestId('close-button');
      fireEvent.click(closeButton);
      expect(onClick).toHaveBeenCalled();
    }, 100);
  });
});
