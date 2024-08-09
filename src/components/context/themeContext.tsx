import { createContext, ReactNode, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    const themeCookie = Cookies.get('isTheme');
    if (themeCookie) {
      setIsDark(JSON.parse(themeCookie));
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      Cookies.set('isTheme', JSON.stringify(isDark), { expires: 7 });
    });
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
