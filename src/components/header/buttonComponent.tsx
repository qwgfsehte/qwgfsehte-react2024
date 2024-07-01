import axios from 'axios';
import React from 'react';

class SearchButton extends React.Component {
  handleClick() {
    axios
      .get('https://pokeapi.co/api/v2/pokemon/ditto')
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }

  render(): React.ReactNode {
    return (
      <button
        className="search-form__button"
        onClick={this.handleClick}
      ></button>
    );
  }
}

export default SearchButton;
