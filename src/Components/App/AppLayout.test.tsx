import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AppContent } from './appLayout';
import { Provider } from 'react-redux';
import store from '../store';
import { ThemeProvider } from '../context/themeContext';
import mockRouter from 'next-router-mock';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { AllPokemons } from 'src/interfaces/interface';

describe('test app component', () => {
  test('render error message', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <RouterContext.Provider value={mockRouter}>
            <AppContent allPokemons={[]} />
          </RouterContext.Provider>
        </ThemeProvider>
      </Provider>
    );

    expect(
      screen.getByText('No pokemons found. Please try another search term.')
    ).toBeInTheDocument();
  });

  test('render header and footer message', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <RouterContext.Provider value={mockRouter}>
            <AppContent allPokemons={[]} />
          </RouterContext.Provider>
        </ThemeProvider>
      </Provider>
    );

    expect(screen.getByText('PokePedia')).toBeInTheDocument();
    expect(screen.getByText('2024')).toBeInTheDocument();
  });

  test('renders with pokemon data', () => {
    const allPokemons: AllPokemons[] = [
      { name: 'pikachu', url: 'testUrl' },
      { name: 'bulbasaur', url: 'testUrl' },
    ];

    render(
      <Provider store={store}>
        <ThemeProvider>
          <RouterContext.Provider value={mockRouter}>
            <AppContent allPokemons={allPokemons} />
          </RouterContext.Provider>
        </ThemeProvider>
      </Provider>
    );

    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
  });
});
