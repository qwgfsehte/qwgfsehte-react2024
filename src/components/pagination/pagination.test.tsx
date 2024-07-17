import { describe, test, vi, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Pagination } from './pagination';

describe('test pagination component', () => {
  const handleNextPage = vi.fn();
  const handlePrevPage = vi.fn();
  const setCurrentPage = vi.fn();
  const closePokemonDetails = vi.fn();

  test('render pagination', () => {
    render(
      <Pagination
        handleNextPage={handleNextPage}
        handlePrevPage={handlePrevPage}
        currentPage={3}
        setCurrentPage={setCurrentPage}
        closePokemonDetails={closePokemonDetails}
      />
    );

    const prevButton = screen.getByTestId('button-prev');
    fireEvent.click(prevButton);
    expect(handlePrevPage).toHaveBeenCalledTimes(0);
    expect(closePokemonDetails).toHaveBeenCalledTimes(1);
    expect(setCurrentPage).toHaveBeenCalledTimes(0);

    const nextButton = screen.getByTestId('button-next');
    fireEvent.click(nextButton);
    expect(handleNextPage).toHaveBeenCalledTimes(0);
    expect(closePokemonDetails).toHaveBeenCalledTimes(2);
    expect(setCurrentPage).toHaveBeenCalledTimes(0);

    const numberButton = screen.getByText('2');
    fireEvent.click(numberButton);
    expect(setCurrentPage).toHaveBeenCalledTimes(0);
  });
});
