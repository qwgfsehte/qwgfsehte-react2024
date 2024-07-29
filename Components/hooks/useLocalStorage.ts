import { useEffect, useState } from 'react';

export function useLocalStorage(key: string, initialValue = '') {
  const [inputValue, setInputValue] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key) || initialValue;
    }
    return initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, inputValue);
  }, [inputValue, key]);

  return [inputValue, setInputValue] as const;
}
