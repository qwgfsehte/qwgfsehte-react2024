import React from 'react';
import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorMessage from './errorMessage';
import '@testing-library/jest-dom';

describe('test error message component', () => {
  test('render error message when there is an error', () => {
    render(<ErrorMessage />);
    const imageElement = screen.getByAltText('pokemon-for-error');
    expect(imageElement).toHaveAttribute('src');
    const src = imageElement.getAttribute('src');
    const regex = /\/_next\/image\?url=%2Fassets%2Fimgs%2Ferror-search\.png/;
    expect(src).toMatch(regex);
    expect(
      screen.getByText('No pokemons found. Please try another search term.')
    ).toBeInTheDocument();
  });
});
