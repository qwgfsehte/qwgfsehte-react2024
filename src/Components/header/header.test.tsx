import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './header';
import { ThemeProvider } from '../context/themeContext';

describe('test header component', () => {
  test('render logo and title', () => {
    render(
      <ThemeProvider>
        <Header />
      </ThemeProvider>
    );
    expect(screen.getByAltText('logo-pokepedia')).toBeInTheDocument();
    expect(screen.getByText('PikaInfo')).toBeInTheDocument();
  });
});
