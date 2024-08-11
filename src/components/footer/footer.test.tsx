import '@testing-library/jest-dom';
import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from './footer';
import { ThemeProvider } from '../context/themeContext';

describe('test footer component', () => {
  test('contains the link to pokeapi with correct attributes', () => {
    render(
      <ThemeProvider>
        <Footer />
      </ThemeProvider>
    );
    const linkElement = screen.getByRole('link', { name: '' });

    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', 'https://pokeapi.co/');
    expect(linkElement).toHaveAttribute('target', '_blank');
    expect(linkElement).toHaveAttribute('rel', 'noreferrer');
  });

  test('contains the year 2024', () => {
    render(
      <ThemeProvider>
        <Footer />
      </ThemeProvider>
    );
    const yearElement = screen.getByText('2024');

    expect(yearElement).toBeInTheDocument();
  });
});
