import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { AppContent } from './appLayout';
import { Provider } from 'react-redux';
import store from '../store';
import { ThemeProvider } from '../context/themeContext';

describe('test app component', () => {
  test('render header and loading indicator components', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ThemeProvider>
            <AppContent />
          </ThemeProvider>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('PokePedia')).toBeInTheDocument();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
