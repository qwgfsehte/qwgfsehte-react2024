import styles from './header.module.scss';
import React from 'react';
import SearchInput from './inputSearch/InputComponent';
import { useToggleTheme } from '../context/useContext';
import SearchButton from './buttonSearch/buttonComponent';

function Header(): React.ReactElement {
  const { toggleTheme } = useToggleTheme();

  return (
    <header className={styles.header}>
      <div className={styles['logo-container']}>
        <img
          src="/assets/logo/logo.png"
          alt="logo-pokepedia"
          className={styles['logo']}
        />
        <p className={styles['logo-title']}>PokePedia</p>
      </div>
      <div className={styles['search-form']}>
        <SearchInput />
        <SearchButton />
      </div>
      <button className={styles['button-theme']} onClick={toggleTheme}></button>
    </header>
  );
}

export default Header;
