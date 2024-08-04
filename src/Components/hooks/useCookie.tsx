'use client';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';

export function useCookie(
  key: string,
  initialValue: string = ''
): [string, (value: string) => void] {
  const [value, setValue] = useState<string>(Cookies.get(key) || initialValue);

  useEffect(() => {
    const handleCookieChange = () => {
      const newValue = Cookies.get(key) || '';
      if (newValue !== value) {
        setValue(newValue);
      }
    };

    const interval = setInterval(handleCookieChange, 1000);

    return () => clearInterval(interval);
  }, [value, key]);

  const updateCookie = (newValue: string) => {
    Cookies.set(key, newValue, { expires: 7 });
    setValue(newValue);
  };

  return [value, updateCookie];
}
