import React from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import styles from '../header.module.scss';
import { useToggleTheme } from '../../../Components/context/useContext';
import stylesTheme from '../../context/theme.module.scss';

function SearchInput(): React.ReactElement {
  const { isDark } = useToggleTheme();
  const [inputValue, setInputValue] = useLocalStorage('searchValueInput');

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
  }

  return (
    <input
      value={inputValue}
      placeholder="Search"
      type="text"
      className={`${styles['search-form__input']} ${isDark ? stylesTheme['dark-search-form__input'] : ''}`}
      onChange={handleInputChange}
    ></input>
  );
}

export default SearchInput;
