'use client';
import styles from '../Components/Layout.module.scss';
import stylesMain from '../Components/App/app.module.scss';
import Header from '../Components/header/header';
import { Footer } from '../Components/footer/footer';
import React from 'react';
import { useToggleTheme } from './context/useContext';
import stylesTheme from '../Components/context/theme.module.scss';
import ErrorBoundary from './errorBoundary/errorBoundary';

interface LayoutProps {
  mainChildren: React.ReactElement;
  secondaryChildren: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ mainChildren, secondaryChildren }) => {
  const { isDark } = useToggleTheme();

  return (
    <ErrorBoundary>
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
    </ErrorBoundary>
  );
};

export default Layout;
