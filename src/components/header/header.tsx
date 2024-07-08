import SearchInput from './InputComponent';
import './header.scss';
import React, { useState } from 'react';
import { HeaderProps } from '../../interfaces/interface';
import SearchButton from './buttonComponent';

function Header({ triggerError, fetchData }: HeaderProps): React.ReactElement {
  const [inputValue, setInputValue] = useState(
    localStorage.getItem('searchValueInput') || ''
  );

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
  }

  async function handleButtonClick() {
    localStorage.setItem('searchValueInput', inputValue.trim().toLowerCase()),
      await fetchData();
  }

  return (
    <header className="header">
      <div className="logo-container">
        <img src="./src/assets/logo/logo.png" alt="" className="logo" />
        <p className="logo-title">PokePedia</p>
      </div>
      <div className="search-form">
        <SearchInput value={inputValue} onChange={handleInputChange} />
        <SearchButton onClick={handleButtonClick} />
      </div>
      <button className="button-trigger" onClick={triggerError}>
        Trigger Error
      </button>
    </header>
  );
}

export default Header;
