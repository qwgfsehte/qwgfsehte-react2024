import './header.scss';
import React, { useEffect, useState } from 'react';
import { useToggleTheme } from '../context/useContext';
import Cookies from 'js-cookie';
import { Link } from '@remix-run/react';

function Header(): React.ReactElement {
  const { isDark, toggleTheme } = useToggleTheme();
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setInputValue(Cookies.get('searchValueInput') || '');
  }, []);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
  }

  function handleButtonClick() {
    Cookies.set('searchValueInput', inputValue, { expires: 7 });
  }

  return (
    <header className={`header ${isDark ? 'dark header dark-header ' : ''}`}>
      <div className="logo-container">
        <img
          src="/src/assets/logo/logo.png"
          alt="logo-pokepedia"
          className="logo"
        />
        <p className="logo-title">PokePedia</p>
      </div>
      <div className="search-form">
        <input
          value={inputValue}
          placeholder="Search"
          type="text"
          className="search-form__input"
          onChange={handleInputChange}
        ></input>
        <Link
          data-testid="search-button"
          className="search-form__button"
          onClick={handleButtonClick}
          to={'/search/page/1'}
        ></Link>
      </div>
      <button className="button-theme" onClick={toggleTheme}></button>
    </header>
  );
}

export default Header;
