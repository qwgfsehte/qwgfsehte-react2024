import { useDispatch, useSelector } from 'react-redux';
import styles from 'Components/body/pokemonsList/pokemonList.module.scss';
import {
  addItem,
  removeItem,
  setNameSelectedPokemon,
} from './pokemonList.slice';
import { ChangeEvent, useEffect } from 'react';
import { RootState } from '../../store';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Pokeball } from './pokeball';

function PokemonsList(): React.ReactElement {
  const dispatch = useDispatch();

  const nameSelectedPokemon = useSelector(
    (state: RootState) => state.pokemonListSlice.nameSelectedPokemon
  );
  const pokemonPage = useSelector(
    (state: RootState) => state.pokemonListSlice.pokemonPage
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

  localStorage.setItem('selectedItems', JSON.stringify(selectedItems));

  const { name } = useParams();

  useEffect(() => {
    if (name) {
      dispatch(setNameSelectedPokemon(name as string));
    }
  }, [dispatch, name]);

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
            <Link
              key={index}
              className={styles['card']}
              onClick={() => dispatch(setNameSelectedPokemon(pokemon.name))}
              href={`details/${pokemon.name}`}
            >
              <Pokeball />
              <h3 className={styles['card-name']}>{pokemon.name}</h3>
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
