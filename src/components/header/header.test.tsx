import { describe, vi, test, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './header';

describe('test header component', () => {
  const testFetchData = vi.fn();
  const testClosePokemonDetails = vi.fn();

  beforeEach(() => {
    localStorage.setItem('searchValueInput', 'bulbasaur');
  });

  afterEach(() => {
    localStorage.clear();
  });

  test('render logo and title', () => {
    render(
      <Header
        fetchData={testFetchData}
        closePokemonDetails={testClosePokemonDetails}
      />
    );
    expect(screen.getByAltText('logo-pokepedia')).toBeInTheDocument();
    expect(screen.getByText('PokePedia')).toBeInTheDocument();
  });

  test('calls fetchData and closePokemonDetails on button click', async () => {
    render(
      <Header
        fetchData={testFetchData}
        closePokemonDetails={testClosePokemonDetails}
      />
    );
    fireEvent.click(screen.getByRole('button'));
    await waitFor(() => {
      expect(testClosePokemonDetails).toHaveBeenCalled();
      expect(testFetchData).toHaveBeenCalled();
    });
  });

  test('get value from localStorage and uses value as input value', () => {
    render(
      <Header
        fetchData={testFetchData}
        closePokemonDetails={testClosePokemonDetails}
      />
    );
    const input = screen.getByRole('textbox');
    expect((input as HTMLInputElement).value).toBe('bulbasaur');
  });

  test('handles input change and updates localStorage', () => {
    render(
      <Header
        fetchData={testFetchData}
        closePokemonDetails={testClosePokemonDetails}
      />
    );

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'pikachu' } });

    expect(localStorage.getItem('searchValueInput')).toBe('pikachu');
  });
});
