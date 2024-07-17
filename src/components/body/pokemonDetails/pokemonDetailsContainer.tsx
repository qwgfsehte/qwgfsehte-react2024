import { useState } from 'react';
import { PokemonDetailsInfo } from './pokemonDetailsInfo';
import { RootState } from '../../../store';
import { useSelector } from 'react-redux';

function PokemonDetailsContainer() {
  const [loading, setLoading] = useState(true);

  const nameSelectedPokemon = useSelector(
    (state: RootState) => state.pokemonListSlice.nameSelectedPokemon
  );

  setTimeout(() => {
    setLoading(false);
  }, 100);

  if (nameSelectedPokemon) {
    return (
      <>
        {loading && <div className="loading-container">Loading...</div>}
        {!loading && (
          <div className="pokemon-details">
            <PokemonDetailsInfo />
          </div>
        )}
      </>
    );
  } else {
    return null;
  }
}
export default PokemonDetailsContainer;
