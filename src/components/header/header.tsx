import SearchInput from './InputComponent';
import SearchButton from './buttonComponent';
import './header.scss';
import React from 'react';

class Header extends React.Component {
  render(): React.ReactNode {
    return (
      <header className="header">
        <img src="./src/assets/logo/logo.png" alt="" className="logo" />
        <div className="search-form">
          <SearchInput />
          <SearchButton />
        </div>
      </header>
    );
  }
}

export default Header;
