import { PokemonDetailsInfo } from './pokemonDetailsInfo';
import { useSelector } from 'react-redux';
import styles from './pokemonDetails.module.scss';
import { RootState } from 'src/Components/store';
import { InfoPokemon } from 'src/interfaces/interface';

type InfoPokemonState = {
  infoPokemon: InfoPokemon | null | undefined;
  loading: boolean;
};

function PokemonDetailsContainer(infoPokemon: {
  infoPokemon: InfoPokemonState;
}) {
  const nameSelectedPokemon = useSelector(
    (state: RootState) => state.pokemonListSlice.nameSelectedPokemon
  );

  if (!nameSelectedPokemon) return null;

  if (infoPokemon.infoPokemon.loading) {
    return <div>Loading...</div>;
  }

  if (!infoPokemon.infoPokemon.infoPokemon) {
    return;
  }

  return (
    <div className={styles['pokemon-details']}>
      <PokemonDetailsInfo data={infoPokemon.infoPokemon.infoPokemon} />
    </div>
  );
}
export default PokemonDetailsContainer;
