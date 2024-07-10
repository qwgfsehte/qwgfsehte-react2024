import { AllPokemons } from '../../interfaces/interface';
import './pagination.scss';

interface PaginationProps {
  handleNextPage: () => void;
  handlePrevPage: () => void;
  currentPage: number;
  countPages: AllPokemons[][];
  setCurrentPage: (page: number) => void;
}

const FIRST_PAGE = 1;

export function Pagination({
  handleNextPage,
  handlePrevPage,
  currentPage,
  countPages,
  setCurrentPage,
}: PaginationProps) {
  return (
    <section className="pagination-container">
      <button
        className="pagination-button"
        disabled={currentPage === FIRST_PAGE}
        onClick={handlePrevPage}
      >
        Prev
      </button>
      <div className="pagination__item">
        {countPages.map((_, index) => (
          <button onClick={() => setCurrentPage(index + 1)} key={index}>
            {index + 1}
          </button>
        ))}
      </div>
      <button
        className="pagination-button"
        disabled={currentPage === countPages.length}
        onClick={handleNextPage}
      >
        Next
      </button>
    </section>
  );
}
