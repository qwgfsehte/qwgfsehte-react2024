import { afterAll, beforeAll, describe, expect, test, vi } from 'vitest';
import ErrorBoundary from './errorBoundary';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img {...props} alt={''} />
  ),
}));

const ProblematicComponent: React.FC = () => {
  throw new Error('Test error');
};

describe('ErrorBoundary', () => {
  let originalConsoleError: (
    message?: string,
    ...optionalParams: unknown[]
  ) => void;

  beforeAll(() => {
    originalConsoleError = console.error;
    console.error = vi.fn();
  });

  afterAll(() => {
    console.error = originalConsoleError;
  });

  test('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Child Component</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Child Component')).toBeInTheDocument();
  });

  test('renders error message when an error occurs', () => {
    render(
      <ErrorBoundary>
        <ProblematicComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Oops!')).toBeInTheDocument();
    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
    expect(
      screen.getByText("Don't worry, we're already working on it.")
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Try again' })
    ).toBeInTheDocument();
  });
});
