import styles from './pokemonList.module.scss';

export function Pokeball() {
  return (
    <div className={styles['pokeball']}>
      <div className="pokeball-top"></div>
      <div className="pokeball-bottom"></div>
      <div className="pokeball-center">
        <div className="pokeball-center__button"></div>
      </div>
    </div>
  );
}
