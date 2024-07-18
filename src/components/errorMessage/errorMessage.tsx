import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

function ErrorMessage(): React.ReactElement {
  const errorMessage = useSelector(
    (state: RootState) => state.updatePokemons.errorMessage
  );

  return (
    <div className="error-container">
      <img
        className="main-page__error-img"
        src="/src/assets/imgs/error-search.png"
        alt="pokemon-for-error"
      />
      <h2>{errorMessage}</h2>
    </div>
  );
}

export default ErrorMessage;
