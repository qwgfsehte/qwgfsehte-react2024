import styles from './header.module.scss';
import React, { useEffect, useState } from 'react';
import { useToggleTheme } from '../context/useContext';
import Image from 'next/image';
import stylesTheme from '../context/theme.module.scss';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { setCurrentPage } from '../pagination/pagination.slice';
import { setSearchValue } from '../body/pokemonsList/pokemonList.slice';

const FIRST_PAGE = 1;

function Header(): React.ReactElement {
  const { toggleTheme } = useToggleTheme();
  const { isDark } = useToggleTheme();
  const dispatch: AppDispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setInputValue(localStorage.getItem('searchValueInput') || '');
  }, []);

  const handleSearch = () => {
    dispatch(setCurrentPage(FIRST_PAGE));
    dispatch(setSearchValue(inputValue));
    localStorage.setItem('searchValueInput', inputValue);
  };

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
  }

  return (
    <header className={`${styles.header} ${isDark ? stylesTheme.dark : ''}`}>
      <div className={styles['logo-container']}>
        <Image
          src="/assets/logo/logo.png"
          alt="logo-pokepedia"
          className={styles['logo']}
          width={60}
          height={60}
          priority
        />
        <p className={styles['logo-title']}>PokePedia</p>
      </div>
      <div className={styles['search-form']}>
        <input
          value={inputValue}
          placeholder="Search"
          type="text"
          className={`${styles['search-form__input']} ${isDark ? stylesTheme['dark-search-form__input'] : ''}`}
          onChange={handleInputChange}
        ></input>
        <button
          data-testid="search-button"
          className={`${styles['search-form__button']} ${isDark ? stylesTheme['dark-search-form__button'] : ''}`}
          onClick={() => handleSearch()}
        ></button>
      </div>
      <button
        className={`${styles['button-theme']} ${isDark ? stylesTheme['dark-button-theme'] : ''}`}
        onClick={toggleTheme}
      ></button>
    </header>
  );
}

export default Header;
