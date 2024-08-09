import { useToggleTheme } from '../context/useContext';
import './footer.scss';

export function Footer() {
  const { isDark } = useToggleTheme();

  return (
    <footer
      className={
        isDark ? 'dark-footer-container footer-container' : 'footer-container'
      }
    >
      <a
        target="_blank"
        href="https://pokeapi.co/"
        className="logo-api"
        rel="noreferrer"
      >
        {''}
      </a>
      <div>2024</div>
    </footer>
  );
}
