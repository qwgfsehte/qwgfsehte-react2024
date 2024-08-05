import { Link } from 'react-router-dom';
import { setNameSelectedPokemon } from '../body/pokemonsList/pokemonList.slice';
import PokemonsList from '../body/pokemonsList/pokemonsList';
import Header from '../header/header';
import { Pagination } from '../pagination/pagination';
import './app.scss';
import './../context/theme.scss';
import { ModalWindow } from '../body/flyout/flyout';
import { Footer } from '../footer/footer';

export function AppContent({ allPokemons, currentPage }) {
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
          </section>
          <Pagination />
          <ModalWindow />
        </>
      </main>
      <Footer />
    </>
  );
}
