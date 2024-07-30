import styles from './header.module.scss';
import React from 'react';
import SearchInput from './inputSearch/InputComponent';
import { useToggleTheme } from '../context/useContext';
import SearchButton from './buttonSearch/buttonComponent';
import Image from 'next/image';

function Header(): React.ReactElement {
  const { toggleTheme } = useToggleTheme();

  return (
    <header className={styles.header}>
      <div className={styles['logo-container']}>
        <Image
          src="/assets/logo/logo.png"
          alt="logo-pokepedia"
          className={styles['logo']}
          width={60}
          height={60}
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
