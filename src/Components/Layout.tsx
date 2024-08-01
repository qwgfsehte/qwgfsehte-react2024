import Header from './header/header';
import { Footer } from './footer/footer';
import styles from './Layout.module.scss';

interface LayoutProps {
  mainChildren: React.ReactNode;
  secondaryChildren: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ mainChildren, secondaryChildren }) => {
  return (
    <>
      <Header />
      <div className={styles['container-page']}>
        <main className={styles['container-allCards']}>{mainChildren}</main>
        <aside className={styles['container-detailsInfo']}>
          {secondaryChildren}
        </aside>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
