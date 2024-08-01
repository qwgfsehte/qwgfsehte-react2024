import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { setCurrentPage } from '../../pagination/pagination.slice';
import styles from '../header.module.scss';
import { setSearchValue } from '../../../Components/body/pokemonsList/pokemonList.slice';
import { useToggleTheme } from '../../../Components/context/useContext';
import stylesTheme from '../../context/theme.module.scss';

const FIRST_PAGE = 1;

function SearchButton(): React.ReactElement {
  const { isDark } = useToggleTheme();
  const dispatch: AppDispatch = useDispatch();

  const handleSearch = () => {
    dispatch(setCurrentPage(FIRST_PAGE));
    dispatch(setSearchValue(localStorage.getItem('searchValueInput') || ''));
  };

  return (
    <button
      data-testid="search-button"
      className={`${styles['search-form__button']} ${isDark ? stylesTheme['dark-search-form__button'] : ''}`}
      onClick={() => handleSearch()}
    ></button>
  );
}

export default SearchButton;
