import Header from './header/header';
import { Footer } from './footer/footer';
import styles from './Layout.module.scss';
import stylesTheme from './context/theme.module.scss';
import stylesMain from '../Components/App/app.module.scss';
import { useToggleTheme } from './context/useContext';

interface LayoutProps {
  mainChildren: React.ReactNode;
  secondaryChildren: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ mainChildren, secondaryChildren }) => {
  const { isDark } = useToggleTheme();
  return (
    <div className={`${stylesMain.main} ${isDark ? stylesTheme.dark : ''}`}>
      <Header />
      <div className={styles['container-page']}>
        <main className={styles['container-allCards']}>{mainChildren}</main>
        <aside
          className={`${styles['container-detailsInfo']} ${isDark ? stylesTheme['dark-container-detailsInfo'] : ''}`}
        >
          {secondaryChildren}
        </aside>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
