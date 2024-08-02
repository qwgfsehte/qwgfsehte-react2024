'use client';
import styles from './pokemonList.module.scss';
import { Pokeball } from './pokeball';
import { filterPokemons } from '../../hooks/useFilterPokemons';
import { MainProps, PokemonCardInfo } from 'src/interfaces/interface';
import Link from 'next/link';

function PokemonsList({
  allPokemons,
  currentPage,
}: MainProps): React.ReactElement {
  return (
    <div className={styles['pokemons-list']}>
      {filterPokemons(allPokemons, currentPage, '').map(
        (pokemon: PokemonCardInfo, index) =>
          pokemon ? (
            <div key={index} className={`${styles['card-container']}`}>
              <input
                data-testid={`checkbox-${pokemon.name}-${index}`}
                id={pokemon.name + ' - ' + pokemon.url}
                className={`${styles['pokemon-select']}`}
                type="checkbox"
              ></input>
              <Link
                className={`${styles['card']}`}
                href={`/search/page/${currentPage}/details/${pokemon.name}`}
              >
                <Pokeball />
                <h3 className={styles['card-name']}>
                  {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
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
