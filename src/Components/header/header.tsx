'use client';
import styles from './header.module.scss';
import React from 'react';
import SearchInput from './inputSearch/InputComponent';
import { useToggleTheme } from '../context/useContext';
import SearchButton from './buttonSearch/buttonComponent';
import Image from 'next/image';
import stylesTheme from '../context/theme.module.scss';

function Header(): React.ReactElement {
  const { toggleTheme } = useToggleTheme();
  const { isDark } = useToggleTheme();

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
        <SearchInput />
        <SearchButton />
      </div>
      <button
        className={`${styles['button-theme']} ${isDark ? stylesTheme['dark-button-theme'] : ''}`}
        onClick={toggleTheme}
      ></button>
    </header>
  );
}

export default Header;
