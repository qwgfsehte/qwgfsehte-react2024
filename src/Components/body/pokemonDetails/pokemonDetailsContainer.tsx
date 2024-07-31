import { PokemonDetailsInfo } from './pokemonDetailsInfo';
import { useSelector } from 'react-redux';
import styles from './pokemonDetails.module.scss';
import { RootState } from 'src/Components/store';
import useDetailsPokemon from '../../hooks/useDetailsPokemon';

function PokemonDetailsContainer() {
  const nameSelectedPokemon = useSelector(
    (state: RootState) => state.pokemonListSlice.nameSelectedPokemon
  );

  const { infoPokemon } = useDetailsPokemon(nameSelectedPokemon);

  if (!nameSelectedPokemon) return null;
  const hasError = !infoPokemon;

  return (
    <div className={styles['pokemon-details']}>
      {hasError ? (
        <p>An error occurred or Pokémon not found</p>
      ) : infoPokemon ? (
        <PokemonDetailsInfo data={infoPokemon} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
export default PokemonDetailsContainer;
