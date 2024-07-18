import { useDispatch, useSelector } from 'react-redux';
import './pagination.scss';
import { RootState } from '../../store';
import { setCurrentPage } from './pagination.slice';
import { Link, useNavigate } from 'react-router-dom';
import { setNameSelectedPokemon } from '../body/pokemonsList/pokemonList.slice';

const FIRST_PAGE = 1;

export function Pagination() {
  const filteredPokemons = useSelector(
    (state: RootState) => state.updatePokemons.filteredPokemons
  );
  const currentPage = useSelector(
    (state: RootState) => state.paginationSlice.currentPage
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePageChange = (newPage: number) => {
    dispatch(setCurrentPage(newPage));
    dispatch(setNameSelectedPokemon(''));
    navigate(`/search/page/${newPage}`);
  };

  return (
    <section className="pagination-container">
      <button
        className="pagination__button button-left"
        disabled={currentPage === FIRST_PAGE}
        onClick={() => handlePageChange(currentPage - 1)}
        data-testid="button-prev"
      ></button>
      <div className="pagination">
        {filteredPokemons.map((_, index) => (
          <Link
            onClick={() => {
              handlePageChange(index + 1);
            }}
            key={index}
            className={`pagination__item ${index + 1 === currentPage ? 'pagination__item_active' : ''}`}
            to={`/search/page/${index + 1}`}
          >
            {index + 1}
          </Link>
        ))}
      </div>
      <button
        className="pagination__button button-right"
        disabled={currentPage === filteredPokemons.length}
        onClick={() => handlePageChange(currentPage + 1)}
        data-testid="button-next"
      ></button>
    </section>
  );
}
