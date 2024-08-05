import RootLayout from '../app/search/layout';
import { describe, test, expect, vi, afterEach, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('test render root layout', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(msg => {
      if (!msg.includes('Warning: validateDOMNesting')) {
        console.error(msg);
      }
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('render children correctly', () => {
    const { container } = render(
      <RootLayout>
        <div>test</div>
      </RootLayout>
    );

    expect(screen.getByText('test')).toBeInTheDocument();
    expect(container.querySelector('html')).toBeInTheDocument();
    expect(container.querySelector('body')).toBeInTheDocument();
  });

  test('includes the favicon link in the head', () => {
    render(<RootLayout>{<div></div>}</RootLayout>);

    const faviconLink = document.querySelector('link[rel="icon"]');
    expect(faviconLink).toBeInTheDocument();
    expect(faviconLink).toHaveAttribute('href', '/favicon.png');
  });
});
