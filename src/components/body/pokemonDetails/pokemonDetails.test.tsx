import '@testing-library/jest-dom';
import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PokemonDetailsInfo } from './pokemonDetailsInfo';
import { MemoryRouter } from 'react-router-dom';

const mockData = {
  name: 'pikachu',
  sprites: { front_default: 'pikachu.png' },
  types: [{ type: { name: 'electric' } }],
  cries: { latest: 'latest.mp3', legacy: 'legacy.mp3' },
  weight: 60,
  height: 4,
  abilities: [{ ability: { name: 'static' } }],
  stats: [{ stat: { name: 'speed' }, base_stat: 90 }],
  id: '1',
};

describe('PokemonDetailsInfo', () => {
  test('render error state', () => {
    render(
      <MemoryRouter>
        <PokemonDetailsInfo data={undefined} currentPage={0} />
      </MemoryRouter>
    );

    expect(
      screen.getByText('Error: Pokemon data not found')
    ).toBeInTheDocument();
  });

  test('render pokemon details', () => {
    render(
      <MemoryRouter>
        <PokemonDetailsInfo data={mockData} currentPage={0} />
      </MemoryRouter>
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
