import PokemonsList from '../body/pokemonsList/pokemonsList';
import { Pagination } from '../pagination/pagination';
import styles from './app.module.scss';
import { AllPokemons } from 'src/interfaces/interface';

export function AppContent(allPokemons: { allPokemons: AllPokemons[] }) {
  return (
    <div>
      <button className={styles['shadow-button']}></button>
      <div className={styles['pokemons-container']}>
        <PokemonsList allPokemons={allPokemons.allPokemons} />
      </div>
      <Pagination allPokemons={allPokemons.allPokemons} />
      {/* <ModalWindow /> */}
    </div>
  );
}
