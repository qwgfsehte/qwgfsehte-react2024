import { useDispatch, useSelector } from 'react-redux';
import './pagination.scss';
import { RootState } from '../../store';
import { setNewStateLoading } from '../hooks/useGetPokemons.slice';

interface PaginationProps {
  handleNextPage: () => void;
  handlePrevPage: () => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  closePokemonDetails: () => void;
}

const FIRST_PAGE = 1;

export function Pagination({
  handleNextPage,
  handlePrevPage,
  currentPage,
  setCurrentPage,
  closePokemonDetails,
}: PaginationProps) {
  const filteredpokemons = useSelector(
    (state: RootState) => state.updatePokemons.filteredPokemons
  );
  const dispatch = useDispatch();

  function setNextPage() {
    closePokemonDetails();
    dispatch(setNewStateLoading(true)); // при клике в пагинации
    setTimeout(() => {
      handleNextPage();
    });
    dispatch(setNewStateLoading(false));
  }

  function setPrevPage() {
    closePokemonDetails();
    setTimeout(() => {
      handlePrevPage();
    });
  }

  function setNewPage(index: number) {
    closePokemonDetails();
    setTimeout(() => {
      setCurrentPage(index + 1);
    });
  }

  return (
    <section className="pagination-container">
      <button
        className="pagination__button button-left"
        disabled={currentPage === FIRST_PAGE}
        onClick={setPrevPage}
        data-testid="button-prev"
      ></button>
      <div className="pagination">
        {filteredpokemons.map((_, index) => (
          <button
            onClick={() => {
              setNewPage(index);
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
        disabled={currentPage === filteredpokemons.length}
        onClick={setNextPage}
        data-testid="button-next"
      ></button>
    </section>
  );
}
