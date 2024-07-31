import { useDispatch, useSelector } from 'react-redux';
import styles from './pokemonList.module.scss';
import {
  addItem,
  removeItem,
  setNameSelectedPokemon,
} from './pokemonList.slice';
import { ChangeEvent } from 'react';
import { RootState } from '../../store';
import { Pokeball } from './pokeball';
import { useRouter } from 'next/router';

function PokemonsList(): React.ReactElement {
  const dispatch = useDispatch();
  const router = useRouter();
  const nameSelectedPokemon = useSelector(
    (state: RootState) => state.pokemonListSlice.nameSelectedPokemon
  );
  const pokemonPage = useSelector(
    (state: RootState) => state.pokemonListSlice.pokemonPage
  );

  const currentPage = useSelector(
    (state: RootState) => state.paginationSlice.currentPage
  );

  const selectedItems = useSelector(
    (state: RootState) => state.pokemonListSlice.selectedPokemons
  );

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      dispatch(addItem(event.target.id));
    } else {
      dispatch(removeItem(event.target.id));
    }
  };

  const handlePokemonClick = (pokemonName: string) => {
    const href = `/search/page/${currentPage}/?details=${pokemonName}`;
    router.push(href, undefined, { shallow: true });
    dispatch(setNameSelectedPokemon(pokemonName));
  };

  // localStorage.setItem('selectedItems', JSON.stringify(selectedItems));

  return (
    <div
      className={
        nameSelectedPokemon
          ? `${styles['pokemons-list']} ${styles['half-width']}`
          : styles['pokemons-list']
      }
    >
      {pokemonPage.map((pokemon, index) =>
        pokemon ? (
          <div key={index} className={styles['card-container']}>
            <input
              data-testid={`checkbox-${pokemon.name}-${index}`}
              id={pokemon.name + ' - ' + pokemon.url}
              className={styles['pokemon-select']}
              type="checkbox"
              checked={selectedItems?.includes(
                pokemon.name + ' - ' + pokemon.url
              )}
              onChange={handleCheckboxChange}
            ></input>
            <button
              className={styles['card']}
              onClick={() => handlePokemonClick(pokemon.name)}
            >
              <Pokeball />
              <h3 className={styles['card-name']}>
                {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
              </h3>
            </button>
          </div>
        ) : (
          <div key={index} className={styles['placeholder']}>
            pokemon not found
          </div>
        )
      )}
    </div>
  );
}

export default PokemonsList;
