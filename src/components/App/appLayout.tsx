import PokemonsList from '../body/pokemonsList/pokemonsList';
import { Pagination } from '../pagination/pagination';
import '../App/app.scss';
import './../context/theme.scss';
import { AppProps } from '../../interfaces/interface';
import { Link, Outlet, useLocation } from '@remix-run/react';
import { useToggleTheme } from '../context/useContext';

export function MainContent({ allPokemons, currentPage }: AppProps) {
  const { isDark } = useToggleTheme();
  const location = useLocation();

  const isDetailPageSelected = location.pathname.includes('/details');

  return (
    <div>
      <main
        className={isDark ? 'dark' : 'light'}
        style={{ position: 'relative' }}
      >
        <>
          <Link
            className="shadow-button"
            to={`/search/page/${currentPage}`}
            style={{
              pointerEvents: isDetailPageSelected ? 'auto' : 'none',
            }}
          ></Link>
          <section className="container-cards">
            <PokemonsList allPokemons={allPokemons} currentPage={currentPage} />
            <Outlet />
          </section>
          <Pagination allPokemons={allPokemons} currentPage={currentPage} />
        </>
      </main>
    </div>
  );
}
