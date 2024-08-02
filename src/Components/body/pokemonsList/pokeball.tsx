import styles from './pokemonList.module.scss';

export function Pokeball() {
  return (
    <div className={`${styles['pokeball']}`}>
      <div className={styles['pokeball-top']}></div>
      <div className={styles['pokeball-bottom']}></div>
      <div className={styles['pokeball-center']}>
        <div className={styles['pokeball-center__button']}></div>
      </div>
    </div>
  );
}
