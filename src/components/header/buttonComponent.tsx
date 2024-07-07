import React from 'react';
import { SearchButtonProps } from '../../interfaces/interface';

class SearchButton extends React.Component<SearchButtonProps> {
  render(): React.ReactNode {
    return (
      <button
        className="search-form__button"
        onClick={this.props.onClick}
      ></button>
    );
  }
}

export default SearchButton;
