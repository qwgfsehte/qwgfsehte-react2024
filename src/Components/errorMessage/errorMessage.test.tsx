import React from 'react';
import { describe, test, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorMessage from './errorMessage';
import configureStore from 'redux-mock-store';
import { Store, UnknownAction } from '@reduxjs/toolkit/react';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';

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
        <ErrorMessage />
      </Provider>
    );
    const imageElement = screen.getByAltText('pokemon-for-error');
    expect(imageElement).toHaveAttribute('src');
    const src = imageElement.getAttribute('src');
    const regex = /\/_next\/image\?url=%2Fassets%2Fimgs%2Ferror-search\.png/;
    expect(src).toMatch(regex);
    expect(screen.getByText('test error')).toBeInTheDocument();
  });
});
