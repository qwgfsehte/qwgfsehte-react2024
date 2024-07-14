import { useEffect, useState } from 'react';
import { PokemonDetailsContainerProps } from '../../../interfaces/interface';
import { PokemonDetailsInfo } from './pokemonDetailsInfo';

function PokemonDetailsContainer({
  selectedPokemon,
  closePokemonDetails,
}: PokemonDetailsContainerProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [selectedPokemon]);

  if (selectedPokemon) {
    return (
      <>
        {loading && <div className="loading-container">Loading...</div>}
        {!loading && (
          <div className="pokemon-details">
            <PokemonDetailsInfo
              data={selectedPokemon}
              onClose={closePokemonDetails}
            />
          </div>
        )}
      </>
    );
  } else {
    return null;
  }
}
export default PokemonDetailsContainer;
