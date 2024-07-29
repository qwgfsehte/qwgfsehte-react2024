import styles from './footer.module.scss';

export function Footer() {
  return (
    <div className={styles['footer-container']}>
      <a
        target="_blank"
        href="https://pokeapi.co/"
        className={styles['logo-api']}
        rel="noreferrer"
      >
        {''}
      </a>
      <div>2024</div>
    </div>
  );
}
