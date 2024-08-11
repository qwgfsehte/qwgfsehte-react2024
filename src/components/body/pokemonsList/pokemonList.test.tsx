import '@testing-library/jest-dom';
import { describe, test, expect } from 'vitest';
import { Pokeball } from './pokeball';
import { render, screen } from '@testing-library/react';
import PokemonsList from './pokemonsList';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

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
    const routes = [
      {
        path: '/',
        element: <PokemonsList allPokemons={dataPokemons} currentPage={1} />,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ['/'],
    });

    render(<RouterProvider router={router} />);

    expect(screen.getByText('pikachu')).toBeInTheDocument();
    expect(screen.getByText('charmander')).toBeInTheDocument();
  });

  test('renders placeholder when pokemon not found', () => {
    const routes = [
      {
        path: '/',
        element: <PokemonsList allPokemons={[]} currentPage={1} />,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ['/'],
    });

    render(<RouterProvider router={router} />);

    expect(
      screen.getByText('No pokemons found. Please try another search term.')
    ).toBeInTheDocument();
  });
});
