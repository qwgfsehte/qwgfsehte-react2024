import '@testing-library/jest-dom';
import { describe, test, expect, vi, afterEach } from 'vitest';
import { Pokeball } from './pokeball';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import { ThemeProvider } from '../../../Components/context/themeContext';
import PokemonsList from './pokemonsList';
import Cookies from 'js-cookie';

vi.mock('js-cookie');
const mockCookies = Cookies;

describe('test pokemon list component', () => {
  afterEach(() => {
    vi.clearAllMocks();

    mockRouter.setCurrentUrl('/search/page/1');
  });

  test('render pokeball component', () => {
    const { container } = render(
      <ThemeProvider>
        <Pokeball />
      </ThemeProvider>
    );
    expect(container.firstChild).toHaveClass('_pokeball_8ab701');
  });

  test('render pokemons list component', () => {
    render(
      <ThemeProvider>
        <PokemonsList
          allPokemons={[
            { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
            { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
          ]}
          currentPage={1}
        />
      </ThemeProvider>
    );

    expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('Ivysaur')).toBeInTheDocument();
  });

  test('checkbox functionality', async () => {
    render(
      <ThemeProvider>
        <PokemonsList
          allPokemons={[
            { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
            { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
          ]}
          currentPage={1}
        />
      </ThemeProvider>
    );
    const checkboxBulbasaur = screen.getByTestId('checkbox-bulbasaur-0');

    fireEvent.click(checkboxBulbasaur);
    await waitFor(() => {
      expect(mockCookies.set).toHaveBeenCalledWith(
        'selectedPokemons',
        JSON.stringify(['bulbasaur - https://pokeapi.co/api/v2/pokemon/1/']),
        { expires: 7 }
      );
    });

    fireEvent.click(checkboxBulbasaur);
    await waitFor(() => {
      expect(mockCookies.set).toHaveBeenCalledWith(
        'selectedPokemons',
        JSON.stringify([]),
        { expires: 7 }
      );
    });
  });
});
