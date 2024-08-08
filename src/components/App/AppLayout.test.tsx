import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '../context/themeContext';
import { MainContent } from './appLayout';

describe('test app component', () => {
  test('render main content with empty data pokemons', () => {
    render(
      <MemoryRouter>
        <ThemeProvider>
          <MainContent allPokemons={[]} currentPage={0} />
        </ThemeProvider>
      </MemoryRouter>
    );

    expect(screen.getByText('Pokemons not found')).toBeInTheDocument();
  });
});
