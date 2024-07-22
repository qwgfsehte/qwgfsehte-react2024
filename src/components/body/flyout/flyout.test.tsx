import configureStore from 'redux-mock-store';
import { beforeEach, describe, expect, test } from 'vitest';
import { ModalWindow } from './flyout';
import { Provider } from 'react-redux';
import { fireEvent, render, screen } from '@testing-library/react';
import { clearItems } from '../pokemonsList/pokemonList.slice';

const mockStore = configureStore([]);

describe('test flyout component', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    const initialState = {
      pokemonListSlice: {
        nameSelectedPokemon: 'pikachu',
        pokemonPage: [],
        selectedPokemons: ['bulbasaur', 'charmander'],
      },
      paginationSlice: {
        currentPage: 1,
        currentGroup: 0,
      },
      pokemonDetailsSlice: {
        error: 'Error message',
      },
    };
    store = mockStore(initialState);
  });

  test('renders modal with correct number of selected items', () => {
    render(
      <Provider store={store}>
        <ModalWindow />
      </Provider>
    );

    expect(screen.getByText('2 items are selected')).to.exist;
  });

  test('clear selection button dispatches clearItems action', () => {
    render(
      <Provider store={store}>
        <ModalWindow />
      </Provider>
    );

    fireEvent.click(screen.getByText('Unselect all'));

    const actions = store.getActions();
    expect(actions).to.deep.include(clearItems([]));
  });
});
