import { describe, vi, test, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchInput from './InputComponent';

describe('test input search component', () => {
  describe('test basic props', () => {
    test('render input search', () => {
      const onChangeInput = vi.fn();
      render(<SearchInput />);
      const inputElement = screen.getByPlaceholderText('Search');
      fireEvent.change(inputElement, { target: { value: 'test' } });
      expect(onChangeInput).toHaveBeenCalledTimes(0);
      expect((inputElement as HTMLInputElement).value).toBe('test');
    });
  });
});
