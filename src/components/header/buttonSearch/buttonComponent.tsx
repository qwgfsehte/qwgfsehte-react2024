import React from 'react';
import { filterPokemons } from '../../hooks/useFilterPokemons';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { setCurrentPage } from '../../pagination/pagination.slice';
import { useNavigate } from 'react-router-dom';
import { setNameSelectedPokemon } from '../../body/pokemonsList/pokemonList.slice';
import { setNewStateLoading } from '../../hooks/useGetPokemons.slice';

const FIRST_PAGE = 1;

function SearchButton(): React.ReactElement {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const allPokemons = useSelector(
    (state: RootState) => state.updatePokemons.allPokemons
  );

  const handleSearch = () => {
    filterPokemons(dispatch, allPokemons, FIRST_PAGE);
    dispatch(setCurrentPage(FIRST_PAGE));
    navigate(`/search/page/${FIRST_PAGE}`);
    dispatch(setNameSelectedPokemon(''));
    dispatch(setNewStateLoading(true));
  };

  setTimeout(() => {
    dispatch(setNewStateLoading(false));
  }, 100);

  return (
    <button
      data-testid="search-button"
      className="search-form__button"
      onClick={() => handleSearch()}
    ></button>
  );
}

export default SearchButton;
