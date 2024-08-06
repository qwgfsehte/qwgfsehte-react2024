import './pokemonList.scss';
import { Pokeball } from './pokeball';
import { AppProps, PokemonCardInfo } from '../../../interfaces/interface';
import { filterPokemons } from '../../hooks/useFilterPokemons';
import { Link } from '@remix-run/react';

function PokemonsList({
  allPokemons,
  currentPage,
}: AppProps): React.ReactElement {
  return (
    <div className={'pokemons-list'}>
      {filterPokemons(allPokemons, currentPage, '').map((pokemon, index) =>
        pokemon ? (
          <div key={index} className="card-container">
            <input
              data-testid={`checkbox-${(pokemon as PokemonCardInfo).name}-${index}`}
              id={
                (pokemon as PokemonCardInfo).name +
                ' - ' +
                (pokemon as PokemonCardInfo).url
              }
              className="pokemon-select"
              type="checkbox"
            ></input>
            <Link
              key={index}
              className="card"
              to={`/search/page/${currentPage}/details/${(pokemon as PokemonCardInfo).name}`}
            >
              <Pokeball />
              <h3 className="pokemon-name">
                {(pokemon as PokemonCardInfo).name}
              </h3>
            </Link>
          </div>
        ) : (
          <div key={index} className="placeholder">
            pokemon not found
          </div>
        )
      )}
    </div>
  );
}

export default PokemonsList;
