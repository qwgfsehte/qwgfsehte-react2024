import React from 'react';
import { SearchButtonProps } from '../../../interfaces/interface';

function SearchButton({ onClick }: SearchButtonProps): React.ReactElement {
  return (
    <button
      data-testid="search-button"
      className="search-form__button"
      onClick={onClick}
    ></button>
  );
}

export default SearchButton;
