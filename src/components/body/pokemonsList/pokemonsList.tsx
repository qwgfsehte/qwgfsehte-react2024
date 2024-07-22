import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import './pokemonList.scss';
import {
  addItem,
  removeItem,
  setNameSelectedPokemon,
} from './pokemonList.slice';
import { Link, useParams } from 'react-router-dom';
import { ChangeEvent, useEffect } from 'react';
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

  const { name } = useParams();

  useEffect(() => {
    if (name) {
      dispatch(setNameSelectedPokemon(name));
    }
  }, [dispatch, name]);

  return (
    <div
      className={
        nameSelectedPokemon ? 'pokemons-list half-width' : 'pokemons-list'
      }
    >
      {pokemonPage.map((pokemon, index) =>
        pokemon ? (
          <div key={index} className="card-container">
            <input
              data-testid={`checkbox-${pokemon.name}-${index}`}
              id={pokemon.name + ' - ' + pokemon.url}
              className="pokemon-select"
              type="checkbox"
              checked={selectedItems.includes(
                pokemon.name + ' - ' + pokemon.url
              )}
              onChange={handleCheckboxChange}
            ></input>
            <Link
              key={index}
              className="card"
              onClick={() => dispatch(setNameSelectedPokemon(pokemon.name))}
              to={`details/${pokemon.name}`}
            >
              <Pokeball />
              <h3 className="pokemon-name">{pokemon.name}</h3>
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
