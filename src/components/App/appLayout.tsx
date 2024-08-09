import { Link } from 'react-router-dom';
import PokemonsList from '../body/pokemonsList/pokemonsList';
import { Pagination } from '../pagination/pagination';
import '../App/app.scss';
import './../context/theme.scss';
import { AppProps } from '../../interfaces/interface';
import { Outlet } from '@remix-run/react';
import { useToggleTheme } from '../context/useContext';
import { Suspense } from 'react';
import Loading from '../loading/loading';

export function MainContent({ allPokemons, currentPage }: AppProps) {
  const { isDark } = useToggleTheme();

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
          ></Link>
          <section className="container-cards">
            <Suspense fallback={<Loading />}>
              <PokemonsList
                allPokemons={allPokemons}
                currentPage={currentPage}
              />
            </Suspense>
            <Outlet />
          </section>
          <Pagination allPokemons={allPokemons} currentPage={currentPage} />
        </>
      </main>
    </div>
  );
}
