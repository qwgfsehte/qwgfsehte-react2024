import { AllPokemons } from '../../interfaces/interface';
import './pagination.scss';

interface PaginationProps {
  handleNextPage: () => void;
  handlePrevPage: () => void;
  currentPage: number;
  countPages: AllPokemons[][];
  setCurrentPage: (page: number) => void;
  closePokemonDetails: () => void;
}

const FIRST_PAGE = 1;

export function Pagination({
  handleNextPage,
  handlePrevPage,
  currentPage,
  countPages,
  setCurrentPage,
  closePokemonDetails,
}: PaginationProps) {
  function setNextPage() {
    closePokemonDetails();
    setTimeout(() => {
      handleNextPage();
    });
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
        {countPages.map((_, index) => (
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
        disabled={currentPage === countPages.length}
        onClick={setNextPage}
        data-testid="button-next"
      ></button>
    </section>
  );
}
