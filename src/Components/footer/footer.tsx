'use client';
import { useToggleTheme } from '../context/useContext';
import styles from './footer.module.scss';
import stylesTheme from '../context/theme.module.scss';

export function Footer() {
  const { isDark } = useToggleTheme();
  return (
    <footer
      className={`${styles['footer-container']} ${isDark ? stylesTheme['dark-footer-container'] : ''}`}
    >
      <a
        target="_blank"
        href="https://pokeapi.co/"
        className={styles['logo-api']}
        rel="noreferrer"
      >
        {''}
      </a>
      <div>2024</div>
    </footer>
  );
}
