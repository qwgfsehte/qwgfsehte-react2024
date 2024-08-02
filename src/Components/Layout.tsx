import styles from 'src/Components/Layout.module.scss';
import stylesMain from '../Components/App/app.module.scss';
import Header from 'src/Components/header/header';
import { Footer } from 'src/Components/footer/footer';

interface LayoutProps {
  mainChildren: React.ReactNode;
  secondaryChildren: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ mainChildren, secondaryChildren }) => {
  return (
    <div className={`${stylesMain.main} `}>
      <Header />
      <div className={styles['container-page']}>
        <main className={styles['container-allCards']}>{mainChildren}</main>
        <aside className={`${styles['container-detailsInfo']}`}>
          {secondaryChildren}
        </aside>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
