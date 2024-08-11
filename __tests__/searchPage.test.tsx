import { describe, expect, Mock, test, vi } from 'vitest';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import PageSearch from '../app/routes/search.page.$page';
import '@testing-library/jest-dom';
import * as remix from '@remix-run/react';
import { ThemeProvider } from '../src/components/context/themeContext';

vi.mock('@remix-run/react', async () => {
  const originalModule = await vi.importActual('@remix-run/react');
  return {
    ...originalModule,
    useLoaderData: vi.fn(),
    useParams: vi.fn(),
  };
});

describe('PageSearch', () => {
  const mockUseLoaderData = remix.useLoaderData as Mock;
  const mockUseParams = remix.useParams as Mock;

  const mockAllPokemons = {
    results: [
      { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
      { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
    ],
  };

  test('render main component when data is successful', () => {
    mockUseLoaderData.mockReturnValue(mockAllPokemons);
    mockUseParams.mockReturnValue({ page: '1' });

    const router = createMemoryRouter(
      [
        {
          path: '/search/page/:page',
          element: <PageSearch />,
        },
      ],
      { initialEntries: ['/search/page/1'] }
    );

    render(
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    );

    expect(screen.getByText('2024')).toBeInTheDocument();
    expect(screen.getByText('charmander')).toBeInTheDocument();
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('PokePedia')).toBeInTheDocument();
  });
});
