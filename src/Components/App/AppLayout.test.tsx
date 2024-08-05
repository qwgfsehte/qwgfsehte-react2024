import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AppContent } from './appLayout';
import { ThemeProvider } from '../context/themeContext';

describe('test app component', () => {
  test('renders with pokemon data', () => {
    const allPokemons = [
      { name: 'pikachu', url: 'testUrl' },
      { name: 'bulbasaur', url: 'testUrl' },
    ];

    render(
      <ThemeProvider>
        <AppContent allPokemons={allPokemons} currentPage={1} />
      </ThemeProvider>
    );

    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
  });
});
