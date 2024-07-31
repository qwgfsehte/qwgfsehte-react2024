import '@testing-library/jest-dom';
import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from './footer';

describe('test footer component', () => {
  test('contains the link to pokeapi with correct attributes', () => {
    render(<Footer />);
    const linkElement = screen.getByRole('link', { name: '' });

    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', 'https://pokeapi.co/');
    expect(linkElement).toHaveAttribute('target', '_blank');
    expect(linkElement).toHaveAttribute('rel', 'noreferrer');
  });

  test('contains the year 2024', () => {
    render(<Footer />);
    const yearElement = screen.getByText('2024');

    expect(yearElement).toBeInTheDocument();
  });
});
