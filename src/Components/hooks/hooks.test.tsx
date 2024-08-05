import '@testing-library/jest-dom';
import { act, renderHook } from '@testing-library/react';
import Cookies from 'js-cookie';
import { describe, vi, test, Mock, expect } from 'vitest';
import { useCookie } from './useCookie';

vi.mock('js-cookie');

describe('test hooks', () => {
  test('get value from cookie', () => {
    (Cookies.get as Mock).mockReturnValue('test');
    const { result } = renderHook(() => useCookie('testKey', 'testDefault'));
    expect(result.current[0]).toBe('test');
  });

  test('updates cookie value', () => {
    (Cookies.get as Mock).mockReturnValue('test');
    const { result } = renderHook(() => useCookie('testKey', 'testDefault'));
    const [, setCookieValue] = result.current;
    act(() => {
      setCookieValue('pikachu');
    });
    expect(Cookies.set).toHaveBeenCalledWith('testKey', 'pikachu', {
      expires: 7,
    });
    expect(result.current[0]).toBe('pikachu');
  });

  test('updates state cookie with interval', async () => {
    (Cookies.get as Mock).mockReturnValue('test');
    vi.useFakeTimers();
    const { result } = renderHook(() => useCookie('testKey', 'testDefault'));
    (Cookies.get as Mock).mockReturnValueOnce('test2');
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current[0]).toBe('test2');
  });
});
