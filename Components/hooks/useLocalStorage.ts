import { useEffect, useState } from 'react';

export function useLocalStorage(key: string) {
  const [inputValue, setInputValue] = useState<string>(() => {
    // return localStorage.getItem(key) || initialValue;
  });

  useEffect(() => {
    // localStorage.setItem(key, inputValue);
  }, [inputValue, key]);

  return [inputValue, setInputValue] as const;
}
