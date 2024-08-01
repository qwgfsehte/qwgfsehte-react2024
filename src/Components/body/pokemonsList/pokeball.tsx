import { useToggleTheme } from '../../../Components/context/useContext';
import styles from './pokemonList.module.scss';
import stylesTheme from '../../context/theme.module.scss';

export function Pokeball() {
  const { isDark } = useToggleTheme();

  return (
    <div
      className={`${styles['pokeball']} ${isDark ? stylesTheme['dark-pokeball'] : ''}`}
    >
      <div className={styles['pokeball-top']}></div>
      <div className={styles['pokeball-bottom']}></div>
      <div className={styles['pokeball-center']}>
        <div className={styles['pokeball-center__button']}></div>
      </div>
    </div>
  );
}
