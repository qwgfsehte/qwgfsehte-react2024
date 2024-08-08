import { describe, expect, test, vi } from 'vitest';
import { ModalWindow } from './flyout';
import { fireEvent, render, screen } from '@testing-library/react';
import { createCSV } from './createCSV';

describe('test flyout component', () => {
  const clearItemsMock = vi.fn();

  test('renders modal with correct number of selected items', () => {
    render(
      <ModalWindow
        selectedItems={['1. test', '2. test']}
        clearItems={clearItemsMock}
      />
    );

    expect(screen.getByText('2 items are selected')).to.exist;
  });

  test('clear selection button dispatches clearItems action', () => {
    render(
      <ModalWindow
        selectedItems={['1. test', '2. test']}
        clearItems={clearItemsMock}
      />
    );

    fireEvent.click(screen.getByText('Unselect all'));
    expect(clearItemsMock).toHaveBeenCalledTimes(1);
  });

  test('create CSV string from array of selected items', () => {
    const selectedItems = ['bulbasaur', 'charmander', 'squirtle'];
    expect(createCSV(selectedItems)).toBe(
      '1. bulbasaur\n2. charmander\n3. squirtle'
    );
  });

  test('return an empty string when the array is empty', () => {
    const selectedItems: string[] = [];
    expect(createCSV(selectedItems)).toBe('');
  });

  test('create CSV string for a single item array', () => {
    const selectedItems = ['pikachu'];
    expect(createCSV(selectedItems)).toBe('1. pikachu');
  });
});
