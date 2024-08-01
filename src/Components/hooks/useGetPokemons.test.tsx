import '@testing-library/jest-dom';
import { describe, vi, test, afterEach } from 'vitest';

describe('test hooks', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test('get value with localStorage', () => {
    vi.spyOn(localStorage, 'getItem').mockImplementation(key => {
      if (key === 'searchValueInput') return 'chu';
      return null;
    });
  });
});
