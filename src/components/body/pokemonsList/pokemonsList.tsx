import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { updateFirstLetterToUpperCase } from '../../../utils/utils';
import './pokemonsList.scss';
import { setNameSelectedPokemon } from './pokemonList.slice';

function PokemonsList(): React.ReactElement {
  const dispatch = useDispatch();

  const nameSelectedPokemon = useSelector(
    (state: RootState) => state.pokemonListSlice.nameSelectedPokemon
  );
  const pokemonPage = useSelector(
    (state: RootState) => state.pokemonListSlice.pokemonPage
  );

  return (
    <>
      <div
        className={
          nameSelectedPokemon ? 'pokemons-list half-width' : 'pokemons-list'
        }
      >
        {pokemonPage.map((pokemon, index) =>
          pokemon ? (
            <button
              key={index}
              className="card"
              onClick={() => dispatch(setNameSelectedPokemon(pokemon.name))}
            >
              <div className="card-name">
                <h3>{updateFirstLetterToUpperCase(pokemon.name)}</h3>
              </div>
            </button>
          ) : (
            <div key={index} className="placeholder">
              pokemon not found
            </div>
          )
        )}
      </div>
    </>
  );
}

export default PokemonsList;
