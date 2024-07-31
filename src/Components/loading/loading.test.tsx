import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoadingIndicator from './loading';

describe('test loading indicator component', () => {
  vi.mock('next/image', () => ({
    __esModule: true,
    default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
      <img {...props} alt={props.alt || 'mock image'} src={props.src} />
    ),
  }));

  test('render indicator loading when loading', () => {
    render(<LoadingIndicator />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.getByAltText('Loading')).toHaveAttribute(
      'src',
      '/assets/imgs/loading.gif'
    );
  });
});
