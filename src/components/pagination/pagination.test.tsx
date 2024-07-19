import { describe, test, expect } from 'vitest';
import '@testing-library/jest-dom';
import paginationReducer, {
  initialState,
  setCurrentPage,
} from './pagination.slice';

describe('test pagination component', () => {
  test('initial state', () => {
    const state = paginationReducer(undefined, { type: 'unknow' });
    expect(state).toEqual(initialState);
  });

  test('test setCurrentPage reducer', () => {
    const setCurrentPageState = paginationReducer(
      initialState,
      setCurrentPage(3)
    );
    expect(initialState.currentPage).toBe(1);
    expect(setCurrentPageState.currentPage).toBe(3);
  });
});
