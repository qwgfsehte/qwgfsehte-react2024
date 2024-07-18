import React from 'react';
import { filterPokemons } from '../../hooks/useFilterPokemons';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store';

const FIRST_PAGE = 1;

function SearchButton(): React.ReactElement {
  const dispatch: AppDispatch = useDispatch();
  const allPokemons = useSelector(
    (state: RootState) => state.updatePokemons.allPokemons
  );

  const handleSearch = () => {
    filterPokemons(dispatch, allPokemons, FIRST_PAGE);
  };

  return (
    <button
      data-testid="search-button"
      className="search-form__button"
      onClick={() => handleSearch()}
    ></button>
  );
}

export default SearchButton;
