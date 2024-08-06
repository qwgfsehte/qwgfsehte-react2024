import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { AppContent } from './appLayout';
import { ThemeProvider } from '../context/themeContext';

describe('test app component', () => {
  test('render header and loading indicator components', () => {
    render(
      <MemoryRouter>
        <ThemeProvider>
          <AppContent allPokemons={[]} currentPage={0} />
        </ThemeProvider>
      </MemoryRouter>
    );

    expect(screen.getByText('PokePedia')).toBeInTheDocument();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
