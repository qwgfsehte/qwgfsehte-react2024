import React from 'react';
import { SearchInputProps } from '../../interfaces/interface';

function SearchInput({
  value,
  onChange,
}: SearchInputProps): React.ReactElement {
  return (
    <input
      value={value}
      placeholder="Search"
      type="text"
      className="search-form__input"
      onChange={onChange}
    ></input>
  );
}

export default SearchInput;
