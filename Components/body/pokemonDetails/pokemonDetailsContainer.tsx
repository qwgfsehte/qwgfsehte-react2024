import { RootState } from 'Components/store';
import { PokemonDetailsInfo } from './pokemonDetailsInfo';
import { useSelector } from 'react-redux';
import styles from './pokemonDetails.module.scss';

function PokemonDetailsContainer() {
  const nameSelectedPokemon = useSelector(
    (state: RootState) => state.pokemonListSlice.nameSelectedPokemon
  );

  if (!nameSelectedPokemon) return null;

  return (
    <div className={styles['pokemon-details']}>
      <PokemonDetailsInfo />
    </div>
  );
}
export default PokemonDetailsContainer;
