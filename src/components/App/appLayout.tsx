import { Link } from 'react-router-dom';
import PokemonsList from '../body/pokemonsList/pokemonsList';
import Header from '../header/header';
import { Pagination } from '../pagination/pagination';
import './app.scss';
import './../context/theme.scss';
import { Footer } from '../footer/footer';
import { AppProps } from '../../interfaces/interface';
import { Outlet } from '@remix-run/react';

export function AppContent({ allPokemons, currentPage }: AppProps) {
  return (
    <>
      <Header />
      <main style={{ position: 'relative' }}>
        <>
          <Link
            className="shadow-button"
            to={`/search/page/${currentPage}`}
          ></Link>
          <section className="container-cards">
            <PokemonsList allPokemons={allPokemons} currentPage={currentPage} />
            <Outlet />
          </section>
          <Pagination allPokemons={allPokemons} currentPage={currentPage} />
        </>
      </main>
      <Footer />
    </>
  );
}
