import React from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import styles from 'Components/header/header.module.scss';

function SearchInput(): React.ReactElement {
  const [inputValue, setInputValue] = useLocalStorage('searchValueInput');

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
  }

  return (
    <input
      value={inputValue}
      placeholder="Search"
      type="text"
      className={styles['search-form__input']}
      onChange={handleInputChange}
    ></input>
  );
}

export default SearchInput;
