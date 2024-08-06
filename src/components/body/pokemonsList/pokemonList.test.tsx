// import '@testing-library/jest-dom';
// import { describe, test, expect, vi, afterEach, beforeEach } from 'vitest';
// import { Pokeball } from './pokeball';
// import { render, screen, fireEvent } from '@testing-library/react';
// import PokemonsList from './pokemonsList';
// import configureStore from 'redux-mock-store';
// import { MemoryRouter } from 'react-router-dom';

// const mockStore = configureStore([]);

// describe('test pokemon list component', () => {
//   let store: ReturnType<typeof mockStore>;

//   beforeEach(() => {
//     const initialState = {
//       pokemonListSlice: {
//         nameSelectedPokemon: '',
//         pokemonPage: [
//           { name: 'Pikachu', url: 'url1' },
//           { name: 'Charmander', url: 'url2' },
//         ],
//         selectedPokemons: [],
//       },
//     };

//     store = mockStore(initialState);
//   });

//   afterEach(() => {
//     vi.clearAllMocks();
//   });

//   test('render pokeball component', () => {
//     const { container } = render(<Pokeball />);
//     expect(container.firstChild).toHaveClass('pokeball');
//   });

//   test('render pokemons list component', () => {
//     render(
//       <Provider store={store}>
//         <MemoryRouter>
//           <PokemonsList />
//         </MemoryRouter>
//       </Provider>
//     );
//     expect(screen.getByText('Pikachu')).toBeInTheDocument();
//     expect(screen.getByText('Charmander')).toBeInTheDocument();
//   });

//   test('handles checkbox change', () => {
//     render(
//       <Provider store={store}>
//         <MemoryRouter>
//           <PokemonsList />
//         </MemoryRouter>
//       </Provider>
//     );

//     const checkbox = screen.getByTestId('checkbox-Pikachu-0');
//     fireEvent.click(checkbox);
//     expect(store.getActions()).toContainEqual(addItem('Pikachu - url1'));
//   });

//   test('renders placeholder when pokemon not found', () => {
//     store = mockStore({
//       pokemonListSlice: {
//         pokemonPage: [null],
//       },
//     });

//     render(
//       <Provider store={store}>
//         <MemoryRouter>
//           <PokemonsList />
//         </MemoryRouter>
//       </Provider>
//     );

//     expect(screen.getByText('pokemon not found')).toBeInTheDocument();
//   });
// });
