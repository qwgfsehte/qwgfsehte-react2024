import { useDispatch, useSelector } from 'react-redux';
import './pagination.scss';
import { RootState } from '../../store';
import {
  handleNextPage,
  handlePrevPage,
  setCurrentPage,
} from './pagination.slice';

const FIRST_PAGE = 1;

export function Pagination() {
  const filteredPokemons = useSelector(
    (state: RootState) => state.updatePokemons.filteredPokemons
  );
  const currentPage = useSelector(
    (state: RootState) => state.paginationSlice.currentPage
  );
  const dispatch = useDispatch();

  return (
    <section className="pagination-container">
      <button
        className="pagination__button button-left"
        disabled={currentPage === FIRST_PAGE}
        onClick={() => dispatch(handlePrevPage())}
        data-testid="button-prev"
      ></button>
      <div className="pagination">
        {filteredPokemons.map((_, index) => (
          <button
            onClick={() => {
              dispatch(setCurrentPage(index + 1));
            }}
            key={index}
            className={`pagination__item ${index + 1 === currentPage ? 'pagination__item_active' : ''}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <button
        className="pagination__button button-right"
        disabled={currentPage === filteredPokemons.length}
        onClick={() => dispatch(handleNextPage())}
        data-testid="button-next"
      ></button>
    </section>
  );
}
