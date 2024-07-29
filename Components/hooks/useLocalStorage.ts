import { useEffect, useState } from 'react';

export function useLocalStorage(key: string, initialValue = '') {
  const [inputValue, setInputValue] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key) || initialValue;
    }
    return initialValue;
  });

  useEffect(() => {
    console.log(typeof window);
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, inputValue);
    }
  }, [inputValue, key]);

  return [inputValue, setInputValue] as const;
}
