'use client';
import styles from './header.module.scss';
import React, { useState } from 'react';
import { useToggleTheme } from '../context/useContext';
import Image from 'next/image';
import stylesTheme from '../context/theme.module.scss';
import Cookies from 'js-cookie';
import Link from 'next/link';

function Header(): React.ReactElement {
  const { toggleTheme } = useToggleTheme();
  const { isDark } = useToggleTheme();
  const [inputValue, setInputValue] = useState(
    Cookies.get('searchValueInput') || ''
  );

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setInputValue(value);
  }

  function handle() {
    Cookies.set('searchValueInput', inputValue, { expires: 7 });
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
        <p className={styles['logo-title']}>PikaInfo</p>
      </div>
      <div className={styles['search-form']}>
        <input
          value={inputValue}
          placeholder="Search"
          type="text"
          className={`${styles['search-form__input']} ${isDark ? stylesTheme['dark-search-form__input'] : ''}`}
          onChange={handleInputChange}
        ></input>
        <Link
          data-testid="search-button"
          className={`${styles['search-form__button']} ${isDark ? stylesTheme['dark-search-form__button'] : ''}`}
          onClick={handle}
          href="/search/page/1"
        ></Link>
      </div>
      <button
        className={`${styles['button-theme']} ${isDark ? stylesTheme['dark-button-theme'] : ''}`}
        onClick={toggleTheme}
      ></button>
    </header>
  );
}

export default Header;
