import { useDispatch, useSelector } from 'react-redux';
import './pagination.scss';
import { RootState } from '../store';
import { setCurrentGroup, setCurrentPage } from './pagination.slice';
import { Link, useNavigate } from 'react-router-dom';
import { setNameSelectedPokemon } from '../body/pokemonsList/pokemonList.slice';

const PAGES_PER_GROUP = 10;

export function Pagination() {
  const filteredPokemons = useSelector(
    (state: RootState) => state.updatePokemons.filteredPokemons
  );
  const currentPage = useSelector(
    (state: RootState) => state.paginationSlice.currentPage
  );
  const currentGroup = useSelector(
    (state: RootState) => state.paginationSlice.currentGroup
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePageChange = (newPage: number) => {
    dispatch(setCurrentPage(newPage));
    dispatch(setNameSelectedPokemon(''));
    navigate(`/search/page/${newPage}`);
  };

  const startPage = currentGroup * PAGES_PER_GROUP;
  const endPage = Math.min(
    startPage + PAGES_PER_GROUP,
    filteredPokemons.length
  );

  return (
    <section className="pagination-container">
      <button
        disabled={currentGroup === 0}
        className="pagination__button button-left"
        onClick={() => dispatch(setCurrentGroup(currentGroup - 1))}
      ></button>
      <div className="pagination">
        {filteredPokemons.slice(startPage, endPage).map((_, index) => {
          const pageIndex = startPage + index + 1;
          return (
            <Link
              onClick={() => {
                handlePageChange(pageIndex);
              }}
              key={pageIndex}
              className={`pagination__item ${pageIndex === currentPage ? 'pagination__item_active' : ''}`}
              to={`/search/page/${pageIndex}`}
            >
              {pageIndex}
            </Link>
          );
        })}
      </div>
      <button
        disabled={
          currentGroup === filteredPokemons.slice(startPage, endPage).length
        }
        className="pagination__button button-right"
        onClick={() => dispatch(setCurrentGroup(currentGroup + 1))}
      ></button>
    </section>
  );
}
