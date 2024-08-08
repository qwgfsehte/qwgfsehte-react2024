import { describe, test, expect } from 'vitest';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Pagination } from './pagination';

describe('test pagination component', () => {
  const dataPokemons = [
    { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
  ];
  test('renders pagination buttons and items', () => {
    render(
      <MemoryRouter>
        <Pagination allPokemons={dataPokemons} currentPage={0} />
      </MemoryRouter>
    );

    const leftButton = screen.getByTestId('button-left');
    const rightButton = screen.getByTestId('button-right');

    expect(leftButton).toBeInTheDocument();
    expect(rightButton).toBeInTheDocument();
    expect(screen.getAllByRole('link')).toHaveLength(1);
  });

  test('disables left button on first group', () => {
    render(
      <MemoryRouter>
        <Pagination allPokemons={dataPokemons} currentPage={1} />
      </MemoryRouter>
    );

    const leftButton = screen.getByTestId('button-left');

    expect(leftButton).toBeDisabled();
  });
});
