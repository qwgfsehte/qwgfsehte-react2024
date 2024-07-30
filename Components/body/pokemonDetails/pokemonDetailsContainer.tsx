import { RootState } from 'Components/store';
import { PokemonDetailsInfo } from './pokemonDetailsInfo';
import { useSelector } from 'react-redux';
import styles from './pokemonDetails.module.scss';
import useDetailsPokemon from 'Components/hooks/useDetailsPokemon';

function PokemonDetailsContainer() {
  const nameSelectedPokemon = useSelector(
    (state: RootState) => state.pokemonListSlice.nameSelectedPokemon
  );

  const { infoPokemon } = useDetailsPokemon(nameSelectedPokemon);

  if (!nameSelectedPokemon) return null;

  return (
    <div className={styles['pokemon-details']}>
      {infoPokemon ? (
        <PokemonDetailsInfo data={infoPokemon} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
export default PokemonDetailsContainer;
