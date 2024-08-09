import { describe, expect, Mock, test, vi } from 'vitest';
import * as remix from '@remix-run/react';
import '@testing-library/jest-dom';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import PageDetails from '../app/routes/search.page.$page.details.$pokemon';
import React from 'react';
import { ThemeProvider } from '../src/components/context/themeContext';
import { render, screen } from '@testing-library/react';

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

  const mockDataDetails = {
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

  test('render details component when data is successful', () => {
    mockUseLoaderData.mockReturnValue(mockDataDetails);
    mockUseParams.mockReturnValue({ page: '1' });

    const router = createMemoryRouter(
      [
        {
          path: '/search/page/:page',
          element: <PageDetails />,
        },
      ],
      { initialEntries: ['/search/page/1'] }
    );

    render(
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    );

    expect(screen.getByText('pikachu')).toBeInTheDocument();
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
