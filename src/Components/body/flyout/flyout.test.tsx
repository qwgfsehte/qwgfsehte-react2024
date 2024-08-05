import { describe, expect, test, vi } from 'vitest';
import { ModalWindow } from './flyout';
import { fireEvent, render, screen } from '@testing-library/react';
import { createCSV } from './createCSV';
import { ThemeProvider } from '../../../Components/context/themeContext';
import '@testing-library/jest-dom';

describe('test flyout component', () => {
  const clearItemsMock = vi.fn();

  test('render modal with correct number of selected items', () => {
    render(
      <ThemeProvider>
        <ModalWindow
          selectedItems={['1. test', '2. test']}
          clearItems={clearItemsMock}
        />
      </ThemeProvider>
    );

    expect(screen.getByText('2 items are selected')).to.exist;
    expect(screen.getByText('Unselect all')).toBeInTheDocument();
    expect(screen.getByText('Download')).toBeInTheDocument();
  });

  test('does not render when there are no selected items', () => {
    const { container } = render(
      <ThemeProvider>
        <ModalWindow selectedItems={[]} clearItems={clearItemsMock} />
      </ThemeProvider>
    );

    expect(container.firstChild).toBeNull();
  });

  test('handles clear items button click', () => {
    render(
      <ThemeProvider>
        <ModalWindow
          selectedItems={['1. test', '2. test']}
          clearItems={clearItemsMock}
        />
      </ThemeProvider>
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
