import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { updateFirstLetterToUpperCase } from '../../../utils/utils';
import './pokemonList.scss';
import { setNameSelectedPokemon } from './pokemonList.slice';
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';

function PokemonsList(): React.ReactElement {
  const dispatch = useDispatch();

  const nameSelectedPokemon = useSelector(
    (state: RootState) => state.pokemonListSlice.nameSelectedPokemon
  );
  const pokemonPage = useSelector(
    (state: RootState) => state.pokemonListSlice.pokemonPage
  );

  const { name } = useParams();

  useEffect(() => {
    if (name) {
      dispatch(setNameSelectedPokemon(name));
    }
  }, [dispatch, name]);

  return (
    <>
      <div
        className={
          nameSelectedPokemon ? 'pokemons-list half-width' : 'pokemons-list'
        }
      >
        {pokemonPage.map((pokemon, index) =>
          pokemon ? (
            <Link
              key={index}
              className="card"
              onClick={() => dispatch(setNameSelectedPokemon(pokemon.name))}
              to={`details/${pokemon.name}`}
            >
              <div className="card-name">
                <h3>{updateFirstLetterToUpperCase(pokemon.name)}</h3>
              </div>
            </Link>
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
