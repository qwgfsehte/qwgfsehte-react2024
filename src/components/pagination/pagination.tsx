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
        className="pagination-button"
        disabled={currentPage === FIRST_PAGE}
        onClick={setPrevPage}
      >
        Prev
      </button>
      <div className="pagination__item">
        {countPages.map((_, index) => (
          <button
            onClick={() => {
              setNewPage(index);
            }}
            key={index}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <button
        className="pagination-button"
        disabled={currentPage === countPages.length}
        onClick={setNextPage}
      >
        Next
      </button>
    </section>
  );
}
