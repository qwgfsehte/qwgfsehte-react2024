import Link from 'next/link';
import PokemonsList from '../body/pokemonsList/pokemonsList';
import { Pagination } from '../pagination/pagination';
import styles from './app.module.scss';
import { PokemonCardInfo } from 'src/interfaces/interface';

interface AppProps {
  allPokemons: PokemonCardInfo[];
  currentPage: number;
}

export function AppContent({ allPokemons, currentPage }: AppProps) {
  return (
    <div>
      <Link
        className={styles['shadow-button']}
        href={`/search/page/${currentPage}`}
      ></Link>
      <div className={styles['pokemons-container']}>
        <PokemonsList allPokemons={allPokemons} currentPage={currentPage} />
      </div>
      <Pagination allPokemons={allPokemons} currentPage={currentPage} />
    </div>
  );
}
