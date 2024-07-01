import React from 'react';

class SearchInput extends React.Component {
  render(): React.ReactNode {
    return (
      <input
        placeholder="Search"
        type="text"
        className="search-form__input"
      ></input>
    );
  }
}

export default SearchInput;
