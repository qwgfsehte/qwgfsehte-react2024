import React from 'react';
import { filterPokemons } from '../../hooks/useFilterPokemons';
import { useNavigate } from 'react-router-dom';

const FIRST_PAGE = 1;

function SearchButton(): React.ReactElement {
  return (
    <button
      data-testid="search-button"
      className="search-form__button"
    ></button>
  );
}

export default SearchButton;
