import React from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

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
      className="search-form__input"
      onChange={handleInputChange}
    ></input>
  );
}

export default SearchInput;
