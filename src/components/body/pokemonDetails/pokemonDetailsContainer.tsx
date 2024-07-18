import { PokemonDetailsInfo } from './pokemonDetailsInfo';
import { RootState } from '../../../store';
import { useSelector } from 'react-redux';

function PokemonDetailsContainer() {
  const nameSelectedPokemon = useSelector(
    (state: RootState) => state.pokemonListSlice.nameSelectedPokemon
  );

  if (nameSelectedPokemon) {
    return (
      <>
        <div className="pokemon-details">
          <PokemonDetailsInfo />
        </div>
      </>
    );
  } else {
    return null;
  }
}
export default PokemonDetailsContainer;
