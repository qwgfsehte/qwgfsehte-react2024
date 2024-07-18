import { describe, vi, test, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchButton from './buttonComponent';

describe('test search button component', () => {
  describe('test basic props', () => {
    const clickButton = vi.fn();

    test('render search button and click', () => {
      render(<SearchButton />);
      fireEvent.click(screen.getByRole('button'));
      expect(clickButton).toHaveBeenCalledTimes(1);
    });
  });
});
