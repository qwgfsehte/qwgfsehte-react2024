import { describe, test, expect } from 'vitest';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { Pagination } from './pagination';

describe('test pagination component', () => {
  const dataPokemons = [
    { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
  ];
  test('render pagination buttons and items', () => {
    const routes = [
      {
        path: '/',
        element: <Pagination allPokemons={dataPokemons} currentPage={1} />,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ['/'],
    });

    render(<RouterProvider router={router} />);

    const leftButton = screen.getByTestId('button-left');
    const rightButton = screen.getByTestId('button-right');

    expect(leftButton).toBeInTheDocument();
    expect(rightButton).toBeInTheDocument();
    expect(screen.getAllByRole('link')).toHaveLength(1);
  });

  test('disables left button on first group', () => {
    const routes = [
      {
        path: '/',
        element: <Pagination allPokemons={dataPokemons} currentPage={1} />,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ['/'],
    });

    render(<RouterProvider router={router} />);

    const leftButton = screen.getByTestId('button-left');

    expect(leftButton).toBeDisabled();
  });
});
