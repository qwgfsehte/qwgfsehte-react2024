import React from 'react';
import styles from './errorMessage.module.scss';
import Image from 'next/image';

function ErrorMessage(): React.ReactElement {
  return (
    <div className={styles['error-container']}>
      <Image
        src="/assets/imgs/error-search.png"
        alt="pokemon-for-error"
        width={360}
        height={330}
      />
      <h2>{'No pokemons found. Please try another search term.'}</h2>
    </div>
  );
}

export default ErrorMessage;
