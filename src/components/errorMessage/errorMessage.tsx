import React from 'react';
import { ErrorMessageProps } from '../../interfaces/interface';

function ErrorMessage({ errorMessage }: ErrorMessageProps): React.ReactElement {
  return (
    <div className="error-container">
      <img
        className="main-page__error-img"
        src="./src/assets/imgs/error-search.png"
        alt=""
      />
      <h2>{errorMessage}</h2>
    </div>
  );
}

export default ErrorMessage;
