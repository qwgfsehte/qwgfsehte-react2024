import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MainContent } from './appLayout';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '../context/themeContext';

describe('test app component', () => {
  test('render main content with empty data pokemons', () => {
    const routes = [
      {
        path: '/',
        element: <MainContent allPokemons={[]} currentPage={1} />,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ['/'],
    });

    render(
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    );

    expect(
      screen.getByText('No pokemons found. Please try another search term.')
    ).toBeInTheDocument();
  });
});
