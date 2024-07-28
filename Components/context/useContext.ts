import { useContext } from 'react';
import { ThemeContext } from './themeContext';

export const useToggleTheme = () => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useToggleTheme must be used within a ThemeProvider');
  }

  return context;
};
