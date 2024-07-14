import { describe, vi, test, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Card from './card';
import '@testing-library/jest-dom';

describe('test card component', () => {
  describe('test basic props', () => {
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
    const getInfo = vi.fn();
    const dataWithoutImg = {
      ...data,
      sprites: {
        front_default: null,
      },
    };

    test('render card with correct data', () => {
      render(<Card data={data} getInfo={getInfo} />);
      expect(screen.getByText('#1')).toBeInTheDocument();
      expect(screen.getByAltText('pokemon')).toHaveAttribute(
        'src',
        data.sprites.front_default
      );
      expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
    });

    test('calls getInfo with correct data on click', () => {
      render(<Card data={data} getInfo={getInfo} />);
      fireEvent.click(screen.getByRole('button'));
      expect(getInfo).toHaveBeenCalledWith(data);
    });

    test('render default img if img is missing', () => {
      render(<Card data={dataWithoutImg} getInfo={getInfo} />);
      expect(screen.getByAltText('pokemon')).toHaveAttribute(
        'src',
        './src/assets/imgs/default-img.webp'
      );
    });
  });
});
