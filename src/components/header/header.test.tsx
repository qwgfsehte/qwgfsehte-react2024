import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './header';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '../context/themeContext';

describe('test header component', () => {
  test('render logo and title', () => {
    render(
      <MemoryRouter>
        <ThemeProvider>
          <Header />
        </ThemeProvider>
      </MemoryRouter>
    );
    expect(screen.getByAltText('logo-pokepedia')).toBeInTheDocument();
    expect(screen.getByText('PokePedia')).toBeInTheDocument();
  });
});
