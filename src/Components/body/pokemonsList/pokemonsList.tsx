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
import { filterPokemons } from '../../hooks/useFilterPokemons';
import { AllPokemonsProps, PokemonCardInfo } from 'src/interfaces/interface';

function PokemonsList(pokemonList: AllPokemonsProps): React.ReactElement {
  const dispatch = useDispatch();
  const router = useRouter();
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

  const handlePokemonClick = async (pokemonName: string) => {
    try {
      await router.push(`/search/page/${currentPage}`, undefined, {
        shallow: true,
        scroll: false,
      });
      await router.push(`/search/details/${pokemonName}`, undefined, {
        shallow: true,
        scroll: false,
      });
      dispatch(setNameSelectedPokemon(pokemonName));
    } catch (error) {
      console.error('Error during navigation:', error);
    }
  };

  const inputValue = useSelector(
    (state: RootState) => state.pokemonListSlice.searchValue
  );

  return (
    <div className={styles['pokemons-list']}>
      {filterPokemons(pokemonList.allPokemons, currentPage, inputValue).map(
        (pokemon, index) =>
          pokemon ? (
            <div key={index} className={styles['card-container']}>
              <input
                data-testid={`checkbox-${(pokemon as PokemonCardInfo).name}-${index}`}
                id={
                  (pokemon as PokemonCardInfo).name +
                  ' - ' +
                  (pokemon as PokemonCardInfo).url
                }
                className={styles['pokemon-select']}
                type="checkbox"
                checked={selectedItems?.includes(
                  (pokemon as PokemonCardInfo).name +
                    ' - ' +
                    (pokemon as PokemonCardInfo).url
                )}
                onChange={handleCheckboxChange}
              ></input>
              <button
                className={styles['card']}
                onClick={() =>
                  handlePokemonClick((pokemon as PokemonCardInfo).name)
                }
              >
                <Pokeball />
                <h3 className={styles['card-name']}>
                  {(pokemon as PokemonCardInfo).name.charAt(0).toUpperCase() +
                    (pokemon as PokemonCardInfo).name.slice(1)}
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
