import './header.scss';
import React from 'react';
import SearchButton from './buttonSearch/buttonComponent';
import SearchInput from './inputSearch/InputComponent';

function Header(): React.ReactElement {
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
    </header>
  );
}

export default Header;
