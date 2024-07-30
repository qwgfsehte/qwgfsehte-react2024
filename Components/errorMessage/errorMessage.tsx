import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import styles from 'Components/App/app.module.scss';
import Image from 'next/image';

function ErrorMessage(): React.ReactElement {
  const errorMessage = useSelector(
    (state: RootState) => state.updatePokemons.errorMessage
  );

  return (
    <div className={styles['error-container']}>
      <Image
        className={styles['main-page__error-img']}
        src="/assets/imgs/error-search.png"
        alt="pokemon-for-error"
      />
      <h2>{errorMessage}</h2>
    </div>
  );
}

export default ErrorMessage;
