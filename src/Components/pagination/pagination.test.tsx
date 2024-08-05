import { describe, test, expect } from 'vitest';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Pagination } from './pagination';
import { ThemeProvider } from '../context/themeContext';

describe('test pagination component', () => {
  const allPokemons = {
    allPokemons: [
      {
        name: 'bulbasaur',
        url: 'https://pokeapi.co/api/v2/pokemon/1/',
      },
      {
        name: 'ivysaur',
        url: 'https://pokeapi.co/api/v2/pokemon/2/',
      },
    ],
  };

  test('renders pagination buttons and items', () => {
    render(
      <ThemeProvider>
        <Pagination allPokemons={allPokemons.allPokemons} currentPage={1} />
      </ThemeProvider>
    );

    const leftButton = screen.getByTestId('button-left');
    const rightButton = screen.getByTestId('button-right');

    expect(leftButton).toBeInTheDocument();
    expect(rightButton).toBeInTheDocument();
    expect(screen.getAllByRole('link')).toHaveLength(1);
  });

  test('disables left button on first group', () => {
    render(
      <ThemeProvider>
        <Pagination allPokemons={allPokemons.allPokemons} currentPage={1} />
      </ThemeProvider>
    );

    const leftButton = screen.getByTestId('button-left');

    expect(leftButton).toBeDisabled();
  });
});
