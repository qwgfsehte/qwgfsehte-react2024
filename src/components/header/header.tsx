import SearchInput from './InputComponent';
import './header.scss';
import React from 'react';
import { HeaderProps } from '../../interfaces/interface';
import SearchButton from './buttonComponent';
import { useLocalStorage } from '../hooks/useLocalStorage';

function Header({ fetchData }: HeaderProps): React.ReactElement {
  const [inputValue, setInputValue] = useLocalStorage('searchValueInput');

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
  }

  async function handleButtonClick() {
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
    </header>
  );
}

export default Header;
