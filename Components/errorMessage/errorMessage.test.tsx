import { describe, test, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorMessage from './errorMessage';
import configureStore from 'redux-mock-store';
import { Store, UnknownAction } from '@reduxjs/toolkit/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

const mockStore = configureStore([]);

describe('test error message component', () => {
  let store: Store<unknown, UnknownAction, unknown>;

  beforeEach(() => {
    vi.clearAllMocks();

    store = mockStore({
      updatePokemons: {
        errorMessage: 'test error',
      },
    });
  });

  test('render error message when there is an error', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ErrorMessage />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByAltText('pokemon-for-error')).toHaveAttribute(
      'src',
      '/src/assets/imgs/error-search.png'
    );
    expect(screen.getByText('test error')).toBeInTheDocument();
  });
});
