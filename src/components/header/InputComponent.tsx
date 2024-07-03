import React from 'react';
import { SearchInputProps } from '../../interfaces/interface';

class SearchInput extends React.Component<SearchInputProps> {
  render(): React.ReactNode {
    return (
      <input
        value={this.props.value}
        placeholder="Search"
        type="text"
        className="search-form__input"
        onChange={this.props.onChange}
      ></input>
    );
  }
}

export default SearchInput;
