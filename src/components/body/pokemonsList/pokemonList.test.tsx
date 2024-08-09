import '@testing-library/jest-dom';
import { describe, test, expect } from 'vitest';
import { Pokeball } from './pokeball';
import { render, screen } from '@testing-library/react';
import PokemonsList from './pokemonsList';
import { MemoryRouter } from 'react-router-dom';

describe('test pokemon list component', () => {
  const dataPokemons = [
    { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
  ];

  test('render pokeball component', () => {
    const { container } = render(<Pokeball />);
    expect(container.firstChild).toHaveClass('pokeball');
  });

  test('render pokemons list component', () => {
    render(
      <MemoryRouter>
        <PokemonsList allPokemons={dataPokemons} currentPage={1} />
      </MemoryRouter>
    );
    expect(screen.getByText('pikachu')).toBeInTheDocument();
    expect(screen.getByText('charmander')).toBeInTheDocument();
  });

  test('renders placeholder when pokemon not found', () => {
    render(
      <MemoryRouter>
        <PokemonsList allPokemons={[]} currentPage={1} />
      </MemoryRouter>
    );

    expect(
      screen.getByText('No pokemons found. Please try another search term.')
    ).toBeInTheDocument();
  });
});
