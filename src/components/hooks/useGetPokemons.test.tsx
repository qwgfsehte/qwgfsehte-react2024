import { describe, test, expect, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Routes, Route, MemoryRouter } from 'react-router-dom';
import { WrapperProps } from '../../interfaces/interface';
import { useGetPokemons } from './useGetPokemons';

describe('test get pokemons hook', () => {
  const wrapper: React.FC<WrapperProps> = ({ children }) => (
    <MemoryRouter>
      <Routes>
        <Route path="/" element={children} />
      </Routes>
    </MemoryRouter>
  );

  test('test set current page', () => {
    const { result } = renderHook(() => useGetPokemons(), { wrapper });
    act(() => {
      result.current.setCurrentPage(2);
    });
    expect(result.current.currentPage).toBe(2);

    act(() => {
      result.current.handleNextPage();
    });
    expect(result.current.currentPage).toBe(3);

    act(() => {
      result.current.handlePrevPage();
    });
    expect(result.current.currentPage).toBe(2);
  });

  test('test fetchPokemons successfully', async () => {
    vi.spyOn(globalThis, 'fetch').mockImplementation(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            results: [
              { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
            ],
          }),
      } as Response)
    );

    const { result } = renderHook(() => useGetPokemons(), {
      wrapper,
    });

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.allPokemons).toEqual([
      { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
    ]);
    // expect(result.current.loading).toBe(true);
    //expect(result.current.errorMessage).toBe('');
  });
});
