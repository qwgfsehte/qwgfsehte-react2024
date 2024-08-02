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
import { filterPokemons } from '../../hooks/useFilterPokemons';
import { AllPokemonsProps, PokemonCardInfo } from 'src/interfaces/interface';
import { useToggleTheme } from '../../../Components/context/useContext';
import stylesTheme from '../../context/theme.module.scss';
import Link from 'next/link';

function PokemonsList(pokemonList: AllPokemonsProps): React.ReactElement {
  // const { isDark } = useToggleTheme();
  // // const dispatch = useDispatch();
  // const currentPage = useSelector(
  //   (state: RootState) => state.paginationSlice.currentPage
  // );
  // const selectedItems = useSelector(
  //   (state: RootState) => state.pokemonListSlice.selectedPokemons
  // );

  // // const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
  // //   if (event.target.checked) {
  // //     dispatch(addItem(event.target.id));
  // //   } else {
  // //     dispatch(removeItem(event.target.id));
  // //   }
  // // };

  // // const handlePokemonClick = async (pokemonName: string) => {
  // //   dispatch(setNameSelectedPokemon(pokemonName));
  // // };

  // const inputValue = useSelector(
  //   (state: RootState) => state.pokemonListSlice.searchValue
  // );

  return (
    <div className={styles['pokemons-list']}>
      {filterPokemons(pokemonList.allPokemons, 1, '').map((pokemon, index) =>
        pokemon ? (
          <div key={index} className={`${styles['card-container']}`}>
            <input
              data-testid={`checkbox-${(pokemon as PokemonCardInfo).name}-${index}`}
              id={
                (pokemon as PokemonCardInfo).name +
                ' - ' +
                (pokemon as PokemonCardInfo).url
              }
              className={`${styles['pokemon-select']}`}
              type="checkbox"
            ></input>
            <Link
              className={`${styles['card']}`}
              href={`/search/details/${pokemon.name}`}
            >
              <Pokeball />
              <h3 className={styles['card-name']}>
                {(pokemon as PokemonCardInfo).name.charAt(0).toUpperCase() +
                  (pokemon as PokemonCardInfo).name.slice(1)}
              </h3>
            </Link>
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
