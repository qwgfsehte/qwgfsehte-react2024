import { PokemonDetailsInfo } from './pokemonDetailsInfo';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';

function PokemonDetailsContainer() {
  const nameSelectedPokemon = useSelector(
    (state: RootState) => state.pokemonListSlice.nameSelectedPokemon
  );

  if (!nameSelectedPokemon) return null;

  return (
    <div className="pokemon-details">
      <PokemonDetailsInfo />
    </div>
  );
}
export default PokemonDetailsContainer;
