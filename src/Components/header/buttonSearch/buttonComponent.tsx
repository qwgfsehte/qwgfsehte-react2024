import React from 'react';
import styles from '../header.module.scss';
import { useToggleTheme } from '../../../Components/context/useContext';
import stylesTheme from '../../context/theme.module.scss';

function SearchButton(): React.ReactElement {
  const { isDark } = useToggleTheme();

  return (
    <button
      data-testid="search-button"
      className={`${styles['search-form__button']} ${isDark ? stylesTheme['dark-search-form__button'] : ''}`}
    ></button>
  );
}

export default SearchButton;
