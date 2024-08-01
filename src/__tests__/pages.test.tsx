import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Page404 from '../pages/404';
import PageDetails from '../pages/search/details/[pokemonName]';
import { ThemeProvider } from '../Components/context/themeContext';
import { Provider } from 'react-redux';
import store from '../Components/store';
import mockRouter from 'next-router-mock';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import PageHome from '../pages/search/page/[pageNumber]';

describe('test pages', () => {
  const mockDataPokemons = {
    allPokemons: [
      { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
      { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
    ],
    resultDetailsData: {
      name: 'pikachu',
      sprites: { front_default: 'https://pikachu.png' },
      types: [{ type: { name: 'electric' } }],
      cries: { latest: 'latest.mp3', legacy: 'legacy.mp3' },
      weight: 60,
      height: 4,
      abilities: [{ ability: { name: 'static' } }],
      stats: [{ stat: { name: 'speed' }, base_stat: 90 }],
      id: '1',
    },
  };

  const mockDataPokemonsHomePage = [
    { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
  ];

  test('render the page 404', () => {
    render(<Page404 />);
    expect(screen.getByText('Not Found')).toBeInTheDocument();
  });

  test('render page details', () => {
    render(
      <Provider store={store}>
        <RouterContext.Provider value={mockRouter}>
          <ThemeProvider>{PageDetails(mockDataPokemons)}</ThemeProvider>
        </RouterContext.Provider>
      </Provider>
    );

    expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('Ivysaur')).toBeInTheDocument();
    expect(screen.getByText('PokePedia')).toBeInTheDocument();
    expect(screen.getByAltText('pikachu')).toHaveAttribute(
      'src',
      '/_next/image?url=https%3A%2F%2Fpikachu.png&w=640&q=75'
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

  test('render page home', () => {
    render(
      <Provider store={store}>
        <RouterContext.Provider value={mockRouter}>
          <ThemeProvider>
            <PageHome allPokemons={mockDataPokemonsHomePage} />
          </ThemeProvider>
        </RouterContext.Provider>
      </Provider>
    );

    expect(
      screen.getByText('Please, select a Pokemon for more information')
    ).toBeInTheDocument();
    expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('Ivysaur')).toBeInTheDocument();
    expect(screen.getByText('PokePedia')).toBeInTheDocument();
  });
});
