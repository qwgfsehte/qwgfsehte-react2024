import '@testing-library/jest-dom';
import { describe, test, expect, vi, afterEach } from 'vitest';
import { Pokeball } from './pokeball';
import { render } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import { ThemeProvider } from '../../../Components/context/themeContext';

describe('test pokemon list component', () => {
  afterEach(() => {
    vi.clearAllMocks();

    mockRouter.setCurrentUrl('/search/page/1');
  });

  test('render pokeball component', () => {
    const { container } = render(
      <ThemeProvider>
        <Pokeball />
      </ThemeProvider>
    );
    expect(container.firstChild).toHaveClass('_pokeball_8ab701');
  });
});
