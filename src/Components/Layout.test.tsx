import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import '@testing-library/jest-dom';
import Layout from './Layout';
import { ThemeProvider } from './context/themeContext';
import { Provider } from 'react-redux';
import store from './store';

describe('Layout', () => {
  test('renders Header, Footer and children components', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <Layout
            mainChildren={<div>Main Content</div>}
            secondaryChildren={<div>Secondary Content</div>}
          />
        </ThemeProvider>
      </Provider>
    );

    expect(screen.getByText('PokePedia')).toBeInTheDocument();
    expect(screen.getByText('2024')).toBeInTheDocument();
    expect(screen.getByText('Main Content')).toBeInTheDocument();
    expect(screen.getByText('Secondary Content')).toBeInTheDocument();
  });
});
