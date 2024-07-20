import './header.scss';
import React from 'react';
import SearchButton from './buttonSearch/buttonComponent';
import SearchInput from './inputSearch/InputComponent';
import { useToggleTheme } from '../context/useContext';

function Header(): React.ReactElement {
  const { toggleTheme } = useToggleTheme();

  return (
    <header className="header">
      <div className="logo-container">
        <img
          src="/src/assets/logo/logo.png"
          alt="logo-pokepedia"
          className="logo"
        />
        <p className="logo-title">PokePedia</p>
      </div>
      <div className="search-form">
        <SearchInput />
        <SearchButton />
      </div>
      <button className="button-theme" onClick={toggleTheme}></button>
    </header>
  );
}

export default Header;
