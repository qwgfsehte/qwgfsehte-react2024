import PokemonsList from '../body/pokemonsList/pokemonsList';
import { Pagination } from '../pagination/pagination';
import styles from './app.module.scss';
import { MainProps } from 'src/interfaces/interface';

export function AppContent({ allPokemons, currentPage }: MainProps) {
  return (
    <div>
      <button className={styles['shadow-button']}></button>
      <div className={styles['pokemons-container']}>
        <PokemonsList allPokemons={allPokemons} currentPage={currentPage} />
      </div>
      <Pagination allPokemons={allPokemons} currentPage={currentPage} />
      {/* <ModalWindow /> */}
    </div>
  );
}
