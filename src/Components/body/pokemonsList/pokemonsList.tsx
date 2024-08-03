'use client';
import styles from './pokemonList.module.scss';
import { Pokeball } from './pokeball';
import { filterPokemons } from '../../hooks/useFilterPokemons';
import { MainProps, PokemonCardInfo } from 'src/interfaces/interface';
import Link from 'next/link';

function PokemonsList({
  allPokemons,
  currentPage,
  storedValue,
}: MainProps): React.ReactElement {
  return (
    <div className={styles['pokemons-list']}>
      {filterPokemons(allPokemons, currentPage, storedValue).map(
        (pokemon, index) =>
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
                href={`/search/page/${currentPage}/details/${(pokemon as PokemonCardInfo).name}`}
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
