import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import styles from './errorMessage.module.scss';
import Image from 'next/image';

function ErrorMessage(): React.ReactElement {
  const errorMessage = useSelector(
    (state: RootState) => state.updatePokemons.errorMessage
  );

  return (
    <div className={styles['error-container']}>
      <Image
        src="/assets/imgs/error-search.png"
        alt="pokemon-for-error"
        width={360}
        height={330}
      />
      <h2>{errorMessage}</h2>
    </div>
  );
}

export default ErrorMessage;
