import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoadingIndicator from './loading';

describe('test loading indicator component', () => {
  test('render indicator loading when loading', () => {
    render(<LoadingIndicator />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.getByAltText('Loading')).toHaveAttribute(
      'src',
      '/_next/image?url=%2Fassets%2Fimgs%2Floading.gif&w=828&q=75'
    );
  });
});
