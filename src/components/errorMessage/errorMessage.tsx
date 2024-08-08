import React from 'react';
import './errorMessage.scss';

function ErrorMessage(): React.ReactElement {
  return (
    <div className={'error-container'}>
      <img
        src="/src/assets/imgs/error-search.png"
        alt="pokemon-for-error"
        width={360}
        height={330}
      />
      <h2>{'No pokemons found. Please try another search term.'}</h2>
    </div>
  );
}

export default ErrorMessage;
