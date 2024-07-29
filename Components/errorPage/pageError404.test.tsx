import { describe, test, expect } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorPage404 from './pageError404';

describe('test error page', () => {
  test('render error page when incorrent URL', () => {
    render(<ErrorPage404 />);

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Not Found')).toBeInTheDocument();
    expect(screen.getByAltText('pokemon-error')).toBeInTheDocument();
    expect(screen.getByText('This page doesn’t exist.')).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Go to home' })
    ).toBeInTheDocument();
  });

  test('navigates to home page when "Go to home" button is clicked', () => {
    render(<ErrorPage404 />);
    act(() => {
      screen.getByRole('link', { name: 'Go to home' }).click();
    });

    expect(window.location.pathname).toBe('/');
  });
});
