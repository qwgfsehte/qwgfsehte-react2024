import './header.scss';
import React from 'react';
import { HeaderProps } from '../../interfaces/interface';
import SearchButton from './buttonSearch/buttonComponent';
import { useLocalStorage } from '../hooks/useLocalStorage';
import SearchInput from './inputSearch/InputComponent';

function Header({
  fetchData,
  closePokemonDetails,
}: HeaderProps): React.ReactElement {
  const [inputValue, setInputValue] = useLocalStorage('searchValueInput');

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
  }

  async function handleButtonClick() {
    closePokemonDetails();
    await fetchData();
  }

  return (
    <header className="header">
      <div className="logo-container">
        <img
          src="./src/assets/logo/logo.png"
          alt="logo-pokepedia"
          className="logo"
        />
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
